import axios from "axios";
import { useEffect, useState } from "react";
import ItemCard from "../../components/item-card/ItemCard";
import styles from './CatalogPage.module.scss'

const CatalogPage = () => {

    const [allProducts, setAllProducts] = useState(null);

    useEffect(() => {
        axios.get("https://www.test-store.shop/api/product/all?limit=12&offset=1&sort=name")
          .then((res) => setAllProducts(res.data));
    }, []);

    return (
        <section className={styles.catalogBg}>
            <div className={styles.container}>
                <h2>Каталог</h2>
                <div>
                    <input type="text" />
                    <input type="text" />
                </div>
                <div>
                    <ul className={styles.catalogList}>
                        {allProducts && allProducts.map((item) => (
                          <ItemCard item={item} key={item.product.id} />
                        ))}
                    </ul>
                </div>
                <button>Більше</button>
            </div>
        </section>
    );
};

export default CatalogPage;