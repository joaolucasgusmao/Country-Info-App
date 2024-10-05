import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../api";
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
      <div className={styles.div}>
        <h1 className={styles.h1}>{countryData.commonName}</h1>
        <img
          className={styles.flag}
          src={countryData.flag}
          alt={`${countryData.name} Flag`}
        />
      </div>

      <ul className={styles.ul}>
        <h2 className={styles.h2}>Borders</h2>
        {borders.map((border, index) => {
          return (
            <li className={styles.li} key={index}>
              <div>
                <h3 className={styles.h3}>Name: {border.commonName}</h3>
                <p className={styles.p}>Official Name: {border.officialName}</p>
                <p className={styles.p}>Continent: {border.region}</p>
                <Link to={`/country/${border.countryCode}`}>
                  <span className={styles.span}>
                    Country Code: {border.countryCode}
                  </span>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.chartDiv}>
        {/* Verificação se countryData.populationCounts é verdadeiro e contém dados */}
        {countryData.populationCounts &&
        countryData.populationCounts.length > 0 ? (
          <ReactApexChart
            className={styles.chart}
            options={options}
            series={series}
            type="line"
            height={350}
          />
        ) : (
          <p>No population data available.</p>
        )}
      </div>
    </>
  );
};

export default CountryInfoPage;
