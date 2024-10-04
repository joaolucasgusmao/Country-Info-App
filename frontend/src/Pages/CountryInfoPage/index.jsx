import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import ReactApexChart from "react-apexcharts";

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

  if (!countryData) return <p>Loading...</p>;

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
      text: "Population since 60's",
    },
    grid: {
      row: {
        // colors: ["red", "blue"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
  };

  const series = [
    {
      name: "Population",
      data: countryData.populationCounts.map((item) => item.value),
    },
  ];

  return (
    <>
      <div>
        <h1>{countryData.commonName}</h1>
        <img src={countryData.flag} alt={`${countryData.name} Flag`} />
      </div>
      <div>
        <ul>
          {borders.map((border, index) => {
            return (
              <li key={index}>
                <p>{border.commonName}</p>
                <p>{border.oficialName}</p>
                <p>{border.countryCode}</p>
                <p>{border.region}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
          width={1000}
        />
      </div>
    </>
  );
};

export default CountryInfoPage;
