import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../utils/api";
import ReactApexChart from "react-apexcharts";
import { Loading } from "../../components/Loading";
import styles from "./style.module.scss";

const CountryInfoPage = () => {
  const { countryCode } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [borders, setBorders] = useState(null);

  useEffect(() => {
    const getCountryInfo = async () => {
      const request = await api.get(`/country/${countryCode}`);
      setCountryData(request.data);
      setBorders(request.data.borders);
    };

    getCountryInfo();
  }, [countryCode]);

  if (!countryData) return <Loading />;

  const options = {
    chart: {
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      categories: countryData.populationCounts.map((item) => item.year),
    },
    title: {
      text: "Population",
      align: "left",
      style: {
        fontSize: "18px",
        color: "var(--gray-3)",
      },
    },
  };

  const series = [
    {
      name: "Population",
      data: countryData.populationCounts.map((item) =>
        item.value.toLocaleString("pt-BR")
      ),
    },
  ];

  return (
    <>
      <div className={styles.flagContainer}>
        <h1 className={styles.countryTitle}>{countryData.commonName}</h1>
        <img
          className={styles.flag}
          src={countryData.flag}
          alt={`${countryData.name} Flag`}
        />
      </div>

      <ul className={styles.container}>
        {borders && borders.length > 0 ? (
          <>
            <h2 className={styles.bordersTitle}>Borders</h2>
            {borders.map((border, index) => (
              <li className={styles.countriesList} key={index}>
                <div>
                  <h3 className={styles.countryName}>
                    Name: {border.commonName}
                  </h3>
                  <p className={styles.officialName}>
                    Official Name: {border.officialName}
                  </p>
                  <p className={styles.continent}>Continent: {border.region}</p>
                  <Link to={`/country/${border.countryCode}`}>
                    <span className={styles.countryCode}>
                      Country Code: {border.countryCode}
                    </span>
                  </Link>
                </div>
              </li>
            ))}
          </>
        ) : (
          <h2 className={styles.bordersTitle}>No borders found.</h2>
        )}
      </ul>

      <div className={styles.chartDiv}>
        <ReactApexChart
          className={styles.chart}
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
    </>
  );
};

export default CountryInfoPage;
