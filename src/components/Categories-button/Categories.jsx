import { useEffect, useState } from 'react';
import { fetchAllCategories } from '../../Redax/Products/operation/Operation';
import styles from './Categories.module.scss';


const CategoriesButtons = () => {
    const [allCategories, setAllCategories] = useState(null);
    const [activeButton, setActiveButton] = useState(null);

    useEffect(() => {
        fetchAllCategories()
            .then((categories) => {
                setAllCategories(categories)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    useEffect(() => {
        if (allCategories && allCategories.length > 0) {
            setActiveButton(allCategories[0].name);
        }
    }, [allCategories]);

    const handleClickButton = (e) => {
        setActiveButton(e.target.innerHTML);
    }

    return (
        <ul className={`${styles.list}`}>
            {allCategories &&
                allCategories.map((category) => (
                    <li key={category.name}>
                        <button
                            type="button"
                            className={`${styles.listButton} ${activeButton === category.name ? styles.active : ""}`}
                            onClick={handleClickButton}
                        >
                            {category.name}
                        </button>
                    </li>
                ))}
            <li>
                <button
                    type="button"
                    className={`${styles.listButton} ${activeButton === 'Все' ? styles.active : ""}`}
                    onClick={handleClickButton}
                >
                    Все
                </button>
            </li>
        </ul>
    );
};

export default CategoriesButtons;