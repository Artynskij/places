import { TLocale } from "@/lib/models/types";
import { Input, Select, Space, Tag, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { locales } from "@/config";
import { useState, useEffect, useCallback } from "react";
import { IDetailLang } from "@/lib/models";

interface IProp {
    value?: IDetailLang[];
    onChange?: (details: IDetailLang[]) => void;
    error?: string;
    required?: boolean;
}

export const LanguageManagerBlock = ({
    value = [],
    onChange,
    error,
    required = true,
}: IProp) => {
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>(
        {}
    );

    const currentLanguages = value.map((item) => item.lang);
    const availableLanguagesToAdd = locales.filter(
        (lang) => !currentLanguages.includes(lang)
    );

    // Валидация всех полей
    const validateFields = useCallback(() => {
        const errors: { [key: string]: string } = {};

        value.forEach(({ lang, value: titleValue }) => {
            if (required && !titleValue?.trim()) {
                errors[lang] = `Заполните название на ${lang.toUpperCase()}`;
            }
        });

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    }, [required, value]);

    useEffect(() => {
        validateFields();
    }, [validateFields]);

    const removeLanguage = (langCode: TLocale) => {
        if (currentLanguages.length > 1) {
            const newDetails = value.filter((item) => item.lang !== langCode);
            onChange?.(newDetails);

            // Убираем ошибку для удаленного языка
            setFieldErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[langCode];
                return newErrors;
            });
        } else {
            message.warning("Должен остаться хотя бы один язык");
        }
    };

    const addLanguage = (langCode: TLocale) => {
        if (!currentLanguages.includes(langCode)) {
            const newDetails = [...value, { lang: langCode, value: "" }];
            onChange?.(newDetails);
        }
    };

    const updateTitle = (langCode: TLocale, newValue: string) => {
        let finalValue = newValue;
        let englishError = "";

        // Валидация только для английского языка
        if (langCode === "en" && newValue) {
            // Проверяем на неанглийские символы
            if (!/^[a-zA-Z\s]*$/.test(newValue)) {
                finalValue = ""; // Возвращаем пустую строку
                englishError = "Только английские буквы.";
            }
        }

        const newDetails = value.map((item) =>
            item.lang === langCode ? { ...item, value: finalValue } : item
        );
        onChange?.(newDetails);

        // Валидируем измененное поле
        if (required) {
            const errors: { [key: string]: string } = {};

            if (!finalValue.trim()) {
                errors[langCode] =
                    englishError ||
                    `Заполните название на ${langCode.toUpperCase()}`;
            }

            setFieldErrors((prev) => {
                const newErrors = { ...prev };
                if (Object.keys(errors).length > 0) {
                    newErrors[langCode] = errors[langCode];
                } else {
                    delete newErrors[langCode];
                }
                return newErrors;
            });
        }
    };

    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", marginBottom: 8 }}>
                    Языки названия:
                    {required && (
                        <span style={{ color: "red", marginLeft: 4 }}>*</span>
                    )}
                </label>
                <Space wrap>
                    {value.map(({ lang }) => (
                        <Tag
                            key={lang}
                            closable={value.length > 1}
                            onClose={() => removeLanguage(lang)}
                            closeIcon={<CloseOutlined />}
                            color={fieldErrors[lang] ? "red" : "blue"}
                        >
                            {lang.toUpperCase()}
                        </Tag>
                    ))}

                    {availableLanguagesToAdd.length > 0 && (
                        <Select
                            size="small"
                            placeholder="Добавить язык"
                            style={{ width: 150 }}
                            onChange={addLanguage}
                            value={null}
                        >
                            {availableLanguagesToAdd.map((lang) => (
                                <Select.Option key={lang} value={lang}>
                                    {lang.toUpperCase()}
                                </Select.Option>
                            ))}
                        </Select>
                    )}
                </Space>
            </div>

            {value.map(({ lang, value: titleValue }) => (
                <div key={lang} style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", marginBottom: 4 }}>
                        Название на {lang.toUpperCase()}:
                        {required && (
                            <span style={{ color: "red", marginLeft: 4 }}>
                                *
                            </span>
                        )}
                    </label>
                    <Input
                        placeholder={`Введите название на ${lang}`}
                        value={titleValue}
                        onChange={(e) => updateTitle(lang, e.target.value)}
                        status={fieldErrors[lang] ? "error" : undefined}
                    />
                    {fieldErrors[lang] && (
                        <div
                            style={{
                                color: "#ff4d4f",
                                fontSize: "12px",
                                marginTop: 4,
                            }}
                        >
                            {fieldErrors[lang]}
                        </div>
                    )}
                </div>
            ))}

            {error && (
                <div
                    style={{ color: "#ff4d4f", fontSize: "12px", marginTop: 8 }}
                >
                    {error}
                </div>
            )}
        </>
    );
};
