import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { Loading } from "../../components/Loading";

const CountryListPage = () => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const getInfos = async () => {
      const request = await api.get("/country");
      setCountriesData(request.data);
    };

    getInfos();
  }, []);

  if (!countriesData) return <Loading />;

  return (
    <>
      <h1 className={styles.pageTitle}>Countries List</h1>
      <ul className={styles.countriesContainer}>
        {countriesData.map((country, index) => {
          return (
            <li className={styles.countriesList} key={index}>
              <div>
                <h2 className={styles.countryName}>Name: {country.name}</h2>
                <Link to={`/country/${country.countryCode}`}>
                  <p className={styles.countryCode}>
                    Country Code: {country.countryCode}
                  </p>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CountryListPage;
