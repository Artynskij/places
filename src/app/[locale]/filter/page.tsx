
import { Breadcrumb } from "@/components/UI/BreadCrumb/Breadcrumb";
import style from "./filterPage.module.scss";

import { SliderFilterComponent } from "./_components/ContentComponent/SliderFilterComponent/SliderFilterComponent";
import { FiltersComponent } from "./_components/FilterComponent/FilterComponent";
import { ParamComponent } from "./_components/ContentComponent/ParamComponent/ParamComponent";

import { CardSliderHotel } from "@/components/UI/Cards";
import { mockFilterSliderCard } from "@/asset/mockData/mockFilterSlider";
import { mockObjectsHotels } from "@/asset/mockData/mockObject";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";


export default function FilterPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  return (
    <div className="container">
      <div className={style.breadcrumb}>
        <Breadcrumb />
      </div>
      <div className={style.container}>
        <div className={style.title}>
          <h3>Где остановиться</h3>
          <div className={style.title_result}>3200 результатов</div>
        </div>
        <div className={style.container_filter}>
          <FiltersComponent />
        </div>
        <div className={style.container_content}>
          <div className={style.param}>
            <ParamComponent />
          </div>
          {!searchParams["filter"] && (
            <>
              <div className={style.slider}>
                <SliderFilterComponent
                  nameSlider="Отели"
                  id={1}
                  data={mockFilterSliderCard}
                />
              </div>
              <div className={style.slider}>
                <SliderFilterComponent
                  nameSlider="Бунгало"
                  id={2}
                  data={mockFilterSliderCard}
                />
              </div>
              <div className={style.slider}>
                <SliderFilterComponent
                  nameSlider="Хостелы"
                  id={3}
                  data={mockFilterSliderCard}
                />
              </div>
              <div className={style.slider}>
                <SliderFilterComponent
                  nameSlider="Мотели"
                  id={4}
                  data={mockFilterSliderCard}
                />
              </div>
            </>
          )}
          {searchParams["filter"] && (
            <div className={style.list}>
              {mockObjectsHotels.map((item) => {
                return <CardSliderHotel key={item.id} {...item} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
