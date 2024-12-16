import { IPageProps } from "@/types/IType";
import style from "./countriesScreen.module.scss";
import { countriesData, mainlandData } from "@/asset/mockData/countries";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import Image from "next/image";
import Link from "next/link";

interface IProps extends IPageProps {
  params: IPageProps["params"];
}
export default function CountriesScreen({ params, searchParams }: IProps) {
  const countries = countriesData;
  const mainLand = mainlandData;
  return (
    <div className="container">
      <div className={style.breadcrumb}>
        <Breadcrumb />
      </div>
      <section className={style.content}>
        <ul className={style.listMainland}>
          {mainLand.map((land, index) => {
            // if (land.countries.length === 0) return null;
            return (
              <>
                <li key={index + 1} className={style.listMainland_item}>
                  <h4>{land.title}</h4>
                </li>
                <ul className={style.listCountry}>
                  {land.countries?.map((countryIso) => {
                    const findCountry = countries.find(
                      (country) => country.iso === countryIso
                    );
                    return (
                      <Link
                        className={style.listCountry_item}
                        href={`/${findCountry?.value}`}
                        key={findCountry?.id || index}
                      >
                        <li>
                          <Image
                            className={style.listCountry_item_image}
                            width={1240}
                            height={1240}
                            alt={findCountry?.iso || "alt"}
                            src={`/icons/countryFlag/${findCountry?.flag}`}
                          />
                          <span>{findCountry?.title}</span>
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
