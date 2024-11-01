"use client";
import style from "./finder.module.scss";

import React, { KeyboardEvent, useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { CardSearch } from "../../Cards/CardSearch/CardSearch";

import { mockFinder } from "@/asset/mockData/mockFinder";

import { useTranslations } from "next-intl";
import {
  IconArrowLeft,
  IconCancel,
  IconSearch,
} from "@/components/common/Icons";
import { Overlay } from "@/components/common/Overlay/Overlay";

export const Finder = () => {
  const t = useTranslations("Header");

  const [searchActive, setSearchActive] = useState(false);

  const refInput = useRef<HTMLInputElement>(null);
  const refUl = useRef<HTMLUListElement>(null);

  // const [searchText, setSearchText] = useState("");
  // запрос на сервер
  const [results, setResults] = useState(mockFinder);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [inputValueActive, setInputValueActive] = useState(false);

  const router = useRouter();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      setActiveIndex((prevIndex) => {
        if (prevIndex === 0) {
          return results.length - 1;
        }
        return Math.max(prevIndex - 1, 0);
      });
    } else if (e.key === "ArrowDown") {
      setActiveIndex((prevIndex) => {
        if (prevIndex === results.length - 1) {
          return 0;
        }
        return Math.min(prevIndex + 1, results.length - 1);
      });
    } else if (e.key === "Enter") {
      e.preventDefault();

      // Handle selection

      console.log("Selected:", results[activeIndex]);
      const url = refUl.current?.children[activeIndex] as HTMLAnchorElement;

      router.push(url.pathname);
    }
  };

  function changeInput() {
    const current = refInput.current as HTMLInputElement;
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
  }
  function closeInput() {
    setSearchActive(false);
  }
  function openInput() {
    if (searchActive !== false) return;
    setSearchActive(true);
  }
  return (
    <form className={style.header_item}>
      <div
        onClick={openInput}
        active-class={`${searchActive}`}
        className={style.block}
      >
        <div className={style.block_input}>
          {searchActive ? (
            <IconArrowLeft onClick={closeInput} className={style.icon} />
          ) : (
            <IconSearch style={{ fontSize: "20px" }} className={style.icon} />
          )}

          <div className={style.ctnInput}>
            <input
              placeholder={t("text.finderPlaceholder")}
              onChange={changeInput}
              onKeyDown={handleKeyDown}
              ref={refInput}
              type="text"
            />
          </div>
          {searchActive && inputValueActive && (
            <IconCancel onClick={clearInput} className={style.iconClear} />
          )}
        </div>
        <div className={style.block_dropdown}>
          <div className={style.dropdown}>
            <ul ref={refUl}>
              {results.length > 0 ? (
                results.map((item, index) => {
                  return (
                    <Link
                      onClick={closeInput}
                      key={item.id}
                      href={"/test" + item.img}
                    >
                      <li className={index === activeIndex ? style.active : ""}>
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
                  {t("text.finderNullFirst")} {`"${refInput.current?.value}"`}{" "}
                  {t("text.finderNullSecond")}
                </span>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Overlay active={searchActive} setActive={setSearchActive} />
    </form>
  );
};
