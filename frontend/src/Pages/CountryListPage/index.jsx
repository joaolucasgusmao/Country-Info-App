import { useEffect, useState } from "react";
import { api } from "../../api";
import { Link } from "react-router-dom";

const CountryListPage = () => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const getInfos = async () => {
      const request = await api.get("/country");
      setCountriesData(request.data);
    };

    getInfos();
  }, []);

  return (
    <>
      <ul>
        {countriesData.map((country, index) => {
          return (
            <li key={index}>
              <h3>{country.name}</h3>
              <Link to={`/country/${country.countryCode}`}>
                <p>{country.countryCode}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CountryListPage;
