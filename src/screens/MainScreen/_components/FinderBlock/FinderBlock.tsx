"use client";
import { Switcher } from "@/components/common/Switcher/Switcher";
import style from "./finderBlock.module.scss";
import { KeyboardEvent, useRef, useState } from "react";
import { mockFinder } from "@/asset/mockData/mockFinder";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CardSearch } from "@/components/common/Cards";
import {
  IconArrowLeft,
  IconCancel,
  IconSearch,
} from "@/components/common/Icons";
import { Overlay } from "@/components/common/Overlay/Overlay";
import { Button } from "@/components/UI/Button/Button";
import { switcherFinderMainPage } from "@/asset/mockData/switcherTabsPage";

const FinderBlock = () => {
  const Router = useRouter();
  const switcherDataStart = switcherFinderMainPage;
  const refInput = useRef<HTMLInputElement>(null);
  const refUl = useRef<HTMLUListElement>(null);

  const [switcherData, setSwitcherData] = useState(switcherDataStart);

  const [results, setResults] = useState(mockFinder);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [inputValueActive, setInputValueActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowUp":
        setActiveIndex((prevIndex) =>
          prevIndex === 0 ? results.length - 1 : prevIndex - 1
        );
        break;
      case "ArrowDown":
        setActiveIndex((prevIndex) =>
          prevIndex === results.length - 1 ? 0 : prevIndex + 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < results.length) {
          const url = refUl.current?.children[activeIndex] as HTMLAnchorElement;
          console.log("Selected:", results[activeIndex]);
          closeInput();
          Router.push("/kazahstan/almatydistrict/almaty/objectTest");
        }
        break;
      default:
        break;
    }
  };
  function changeInput() {
    const current = refInput.current as HTMLInputElement;
    setActiveIndex(-1);
    if (current.value.length > 0 && !inputValueActive) {
      setInputValueActive(true);
    } else if (current.value.length === 0 && inputValueActive) {
      setInputValueActive(false);
    }
    const newData = mockFinder.filter(
      (item) =>
        item.title.includes(current.value) ||
        item.location.includes(current.value)
    );
    setResults(newData);
  }
  function clearInput() {
    const current = refInput.current as HTMLInputElement;
    current.value = "";
    setResults(mockFinder);
    setInputValueActive(false);
    setActiveIndex(-1);
  }
  function closeInput() {
    setActiveIndex(-1);
    setSearchActive(false);
  }
  function openInput() {
    if (searchActive !== false) return;
    setSearchActive(true);
  }
  return (
    <>
      <h1 className={style.title}>
        {switcherData.find((item) => item.active)?.title || "Усё"}
      </h1>
      <div className={style.switcher}>
        <Switcher
          callBack={(value) => {
            setSwitcherData((prev) => {
              return prev.map((item) => {
                item.value === value.value
                  ? (item.active = true)
                  : (item.active = false);
                return item;
              });
            });
          }}
          data={switcherData}
        />
      </div>

      <form className={style.form_finder}>
        <div
          onClick={openInput}
          active-class={`${searchActive}`}
          className={style.block}
        >
          <div className={style.block_input}>
            {searchActive ? (
              <IconArrowLeft onClick={closeInput} className={style.icon} />
            ) : (
              <IconSearch className={style.icon} />
            )}

            <div className={style.ctnInput}>
              <input
                placeholder={
                  switcherData.find((item) => item.active)?.placeHolder || "Усё"
                }
                onChange={changeInput}
                onKeyDown={handleKeyDown}
                ref={refInput}
                type="text"
                maxLength={100}
              />
            </div>
            {searchActive && inputValueActive && (
              <IconCancel onClick={clearInput} className={style.iconClear} />
            )}
            {!searchActive && <Button text="Искать" />}
          </div>
          <div className={style.block_dropdown}>
            <div className={style.dropdown}>
              <ul className={style.dropdown_list} ref={refUl}>
                {results.length > 0 ? (
                  results.map((item, index) => {
                    return (
                      <Link
                        onClick={closeInput}
                        key={item.id}
                        href={"/kazahstan/almatydistrict/almaty/objectTest"}
                        className={`${style.dropdown_list_item} ${
                          index === activeIndex ? style.active : ""
                        }`}
                      >
                        <li
                        // className={index === activeIndex ? style.active : ""}
                        >
                          <CardSearch
                            location={item.location}
                            title={item.title}
                            alt={item.img}
                            src={item.img}
                          />
                        </li>
                      </Link>
                    );
                  })
                ) : (
                  <span>
                    {"По запросу"} {`"${refInput.current?.value}"`}{" "}
                    {"Ничего не найдено"}
                  </span>
                )}
              </ul>
            </div>
          </div>
        </div>
        <Overlay
          scrollLock={false}
          active={searchActive}
          setActive={setSearchActive}
        />
      </form>
    </>
  );
};
export default FinderBlock;
