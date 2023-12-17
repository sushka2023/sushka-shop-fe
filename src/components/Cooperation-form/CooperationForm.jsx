import { useEffect, useState } from 'react';
import { sendFormData } from './send-form-operation';
import ClipLoader from "react-spinners/ClipLoader";
import styles from './cooperation-form.module.scss';

const CooperationForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_number: "",
        message: "",
    });
    const [disabled, setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (formData.name !== '' && formData.email !== '') ? setDisabled(false) : setDisabled(true);
    }, [formData.email, formData.name]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await sendFormData(formData);
            return setFormData({
                name: "",
                email: "",
                phone_number: "",
                message: "",
            });
        } catch (e) {
            console.error(e);
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.formTitle}>Залишити заявку</h2>
            <label className={styles.formLabel}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Ваше ім'я*"
                    className={styles.formInput}
                    onChange={handleChange}
                />
            </label>
            <label className={styles.formLabel}>
                <input
                    name="email"
                    value={formData.email}
                    type="email"
                    placeholder="Електронна пошта*"
                    className={styles.formInput}
                    onChange={handleChange}
                />
            </label>
            <label className={styles.formLabel}>
                <input
                    name="phone_number"
                    value={formData.phone_number}
                    type="tel"
                    placeholder="Номер телефону (опціонально)"
                    className={styles.formInput}
                    onChange={handleChange}
                />
            </label>
            <textarea
                name="message"
                value={formData.message}
                placeholder="Додати коментар"
                className={styles.comment}
                onChange={handleChange}
            />
            <button
                type="submit"
                className={`${styles.formBtn} ${!disabled ? styles.formBtnActive : ""
                    }`}
                disabled={disabled || isLoading}
            >
                {isLoading ? (
                    <span>
                        <ClipLoader size={15} color={"#FFFFFF"} />
                    </span>
                ) : (
                    "Відправити"
                )}
            </button>
        </form>
    );
};

export default CooperationForm;