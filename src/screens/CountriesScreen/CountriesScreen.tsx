import { IPageProps } from "@/lib/models/IType";
import style from "./countriesScreen.module.scss";
import { countriesData, continentsData } from "@/asset/constants/countries";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/config/Routes";

interface IProps extends IPageProps {
    params: IPageProps["params"];
}
export default function CountriesScreen({ params, searchParams }: IProps) {
    const countries = countriesData;
    const continents = continentsData;
    return (
        <div className="container">
            <div className={style.breadcrumb}>
                <Breadcrumb links={[{ title: "Все страны" }]} />
            </div>
            <section className={style.content}>
                <ul className={style.listMainland}>
                    {continents.map((land, indexLand) => {
                        if (!land.countries.length) return null;
                        return (
                            <div key={`continent - ${indexLand + 1}`}>
                                <li className={style.listMainland_item}>
                                    <Link
                                        href={ROUTES.LOCATION.LOCATION(
                                            land.id || ""
                                        )}
                                    >
                                        <h4>{land.title}</h4>
                                    </Link>
                                </li>
                                <ul className={style.listCountry}>
                                    {land.countries?.map(
                                        (countryIso, index) => {
                                            const findCountry = countries.find(
                                                (country) =>
                                                    country.iso === countryIso
                                            );
                                            return (
                                                <Link
                                                    className={
                                                        style.listCountry_item
                                                    }
                                                    href={`/${findCountry?.id}`}
                                                    key={`continent - ${
                                                        indexLand + 1
                                                    }, country - ${index + 1}`}
                                                >
                                                    <li>
                                                        <Image
                                                            className={
                                                                style.listCountry_item_image
                                                            }
                                                            width={1240}
                                                            height={1240}
                                                            alt={
                                                                findCountry?.iso ||
                                                                "alt"
                                                            }
                                                            src={`/icons/countryFlag/${findCountry?.flag}`}
                                                        />
                                                        <span>
                                                            {findCountry?.title}
                                                        </span>
                                                    </li>
                                                </Link>
                                            );
                                        }
                                    )}
                                </ul>
                            </div>
                        );
                    })}
                </ul>
            </section>
        </div>
    );
}
