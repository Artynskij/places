// "use client";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//     Table,
//     Button,
//     Space,
//     Input,
//     Form,
//     Modal,
//     message,
//     Tag,
//     Card,
//     Tooltip,
// } from "antd";
// import {
//     EditOutlined,
//     DeleteOutlined,
//     PlusOutlined,
//     ReloadOutlined,
// } from "@ant-design/icons";
// import {
//     IArticleHashTagFront,
//     IArticleHashTagRequest,
//     IArticleCreateHashTagUser,
//     IDetailLang,
//     IOption,
// } from "@/lib/models";
// import { ArticleHashTagService } from "@/lib/Api/(Article)/article-hash-tag.api";
// import { LanguageManagerBlock } from "@/components/common/Form/_components/LangugageManagerBlock/LangugageManagerBlock";
// import { TLocale } from "@/lib/models/types";

// import type { ColumnsType } from "antd/es/table";
// import { CONSTANT_LANGS_DETAILS } from "@/asset/constants/langs-details";
// import { buildEntityField } from "@/lib/helpers/build-entity-field";

// const { Search } = Input;

// // Моковые данные для хэш-тегов
// const MOCK_HASH_TAGS: IArticleHashTagFront[] = [
//     {
//         id: "1",
//         name: "web-development",
//         value: "Веб-разработка",
//         content: {
//             details: [
//                 { lang: "ru", value: "Веб-разработка" },
//                 { lang: "en", value: "Web Development" },
//                 { lang: "es", value: "Desarrollo Web" }
//             ]
//         },
//         articleCount: 25,
//         createdAt: "2024-01-15T10:00:00Z",
//         updatedAt: "2024-01-15T10:00:00Z"
//     },
//     {
//         id: "2",
//         name: "javascript",
//         value: "JavaScript",
//         content: {
//             details: [
//                 { lang: "ru", value: "JavaScript" },
//                 { lang: "en", value: "JavaScript" },
//                 { lang: "de", value: "JavaScript" }
//             ]
//         },
//         articleCount: 67,
//         createdAt: "2024-01-10T14:30:00Z",
//         updatedAt: "2024-01-12T09:15:00Z"
//     },
//     {
//         id: "3",
//         name: "react",
//         value: "React",
//         content: {
//             details: [
//                 { lang: "ru", value: "React" },
//                 { lang: "en", value: "React" },
//                 { lang: "fr", value: "React" }
//             ]
//         },
//         articleCount: 42,
//         createdAt: "2024-01-08T16:45:00Z",
//         updatedAt: "2024-01-08T16:45:00Z"
//     },
//     {
//         id: "4",
//         name: "nodejs",
//         value: "Node.js",
//         content: {
//             details: [
//                 { lang: "ru", value: "Node.js" },
//                 { lang: "en", value: "Node.js" }
//             ]
//         },
//         articleCount: 38,
//         createdAt: "2024-01-05T11:20:00Z",
//         updatedAt: "2024-01-07T13:10:00Z"
//     },
//     {
//         id: "5",
//         name: "typescript",
//         value: "TypeScript",
//         content: {
//             details: [
//                 { lang: "ru", value: "TypeScript" },
//                 { lang: "en", value: "TypeScript" },
//                 { lang: "es", value: "TypeScript" },
//                 { lang: "de", value: "TypeScript" }
//             ]
//         },
//         articleCount: 31,
//         createdAt: "2024-01-03T08:15:00Z",
//         updatedAt: "2024-01-03T08:15:00Z"
//     }
// ];

// // Моковый сервис для хэш-тегов
// class MockArticleHashTagService {
//     private hashTags: IArticleHashTagFront[] = [...MOCK_HASH_TAGS];

//     async get(): Promise<IArticleHashTagFront[]> {
//         // Имитация задержки сети
//         await new Promise(resolve => setTimeout(resolve, 500));
//         return this.hashTags;
//     }

//     async getById(id: string): Promise<IArticleHashTagFront | null> {
//         await new Promise(resolve => setTimeout(resolve, 300));
//         return this.hashTags.find(tag => tag.id === id) || null;
//     }

//     async create(body: IArticleHashTagRequest): Promise<IArticleHashTagFront> {
//         await new Promise(resolve => setTimeout(resolve, 400));
//         const newHashTag: IArticleHashTagFront = {
//             id: Date.now().toString(),
//             name: body.source.Name,
//             value: body.content.details.find((d: IDetailLang) => d.lang === 'ru')?.value || '',
//             content: {
//                 details: body.content.details
//             },
//             articleCount: 0,
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString()
//         };
        
//         this.hashTags.push(newHashTag);
//         return newHashTag;
//     }

//     async update(id: string, body: IArticleHashTagRequest): Promise<IArticleHashTagFront | null> {
//         await new Promise(resolve => setTimeout(resolve, 400));
//         const index = this.hashTags.findIndex(tag => tag.id === id);
//         if (index === -1) return null;

//         const updatedHashTag: IArticleHashTagFront = {
//             ...this.hashTags[index],
//             name: body.source.Name,
//             value: body.content.details.find((d: IDetailLang) => d.lang === 'ru')?.value || '',
//             content: {
//                 details: body.content.details
//             },
//             updatedAt: new Date().toISOString()
//         };

//         this.hashTags[index] = updatedHashTag;
//         return updatedHashTag;
//     }

//     async delete(id: string): Promise<boolean> {
//         await new Promise(resolve => setTimeout(resolve, 300));
//         const initialLength = this.hashTags.length;
//         this.hashTags = this.hashTags.filter(tag => tag.id !== id);
//         return this.hashTags.length < initialLength;
//     }

//     // Методы из вашего сервиса
//     async createUserHashTag(body: IArticleCreateHashTagUser): Promise<boolean> {
//         await new Promise(resolve => setTimeout(resolve, 300));
//         console.log('Creating user hash tag:', body);
//         return true;
//     }

//     async getArticleHashTag(articleId: string): Promise<IArticleHashTagFront[] | null> {
//         await new Promise(resolve => setTimeout(resolve, 300));
//         // Возвращаем случайные теги для демонстрации
//         return this.hashTags.slice(0, 2);
//     }
// }

// export const HashTagArticleTabAdmin: React.FC = () => {
//     const [hashTags, setHashTags] = useState<IArticleHashTagFront[]>([]);
//     const [editHashTag, setEditHashTag] = useState<IArticleHashTagFront | null>(null);
//     const [searchOptions, setSearchOptions] = useState<IOption[]>([]);

//     const [isLoading, setIsLoading] = useState(false);
//     const [isModalActive, setIsModalActive] = useState(false);
//     const [languageDetails, setLanguageDetails] = useState<IDetailLang[]>(
//         CONSTANT_LANGS_DETAILS
//     );
//     const [isModalLoading, setIsModalLoading] = useState(false);
//     const [form] = Form.useForm();

//     const services = useMemo(
//         () => ({
//             hashTag: new MockArticleHashTagService(), // Используем моковый сервис
//         }),
//         []
//     );

//     const fetchAll = useCallback(async () => {
//         setIsLoading(true);
//         try {
//             const data = await services.hashTag.get();
//             setHashTags(data || []);
//         } catch {
//             message.error("Ошибка загрузки хэш-тегов");
//         } finally {
//             setIsLoading(false);
//         }
//     }, [services]);

//     useEffect(() => {
//         fetchAll();
//     }, [fetchAll]);

//     useEffect(() => {
//         if (editHashTag && isModalActive) {
//             const details =
//                 editHashTag.content?.details?.map((detail) => ({
//                     lang: detail.lang as TLocale,
//                     value: detail.value || "",
//                 })) || CONSTANT_LANGS_DETAILS;

//             setLanguageDetails(details);

//             form.setFieldsValue({
//                 code: editHashTag.name || "",
//             });
//         } else if (isModalActive) {
//             form.resetFields();
//             setLanguageDetails(CONSTANT_LANGS_DETAILS);
//         }
//     }, [editHashTag, isModalActive, form]);

//     const fetchById = async (id: string) => {
//         setIsLoading(true);
//         try {
//             const hashTag = await services.hashTag.getById(id);
//             if (!hashTag) {
//                 throw Error("Хэш-тег не найден");
//             }
//             setHashTags([hashTag]);
//         } catch {
//             message.error("Хэш-тег не найден");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const findSearchByTitle = async (title: string) => {
//         if (!title.trim()) {
//             setSearchOptions([]);
//             return;
//         }

//         try {
//             const filtered = hashTags.filter(
//                 (item) =>
//                     item.value?.toLowerCase().includes(title.toLowerCase()) ||
//                     item.name?.toLowerCase().includes(title.toLowerCase())
//             );

//             setSearchOptions(
//                 filtered.map((item) => ({
//                     label: `${item.value} (${item.name})`,
//                     value: item.id,
//                 }))
//             );
//         } catch {
//             message.error("Ошибка поиска");
//             setSearchOptions([]);
//         }
//     };

//     const handleEdit = (record: IArticleHashTagFront) => {
//         setEditHashTag(record);
//         setIsModalActive(true);
//     };

//     const handleDelete = async (record: IArticleHashTagFront) => {
//         Modal.confirm({
//             title: "Удаление хэш-тега",
//             content: `Вы уверены, что хотите удалить хэш-тег "${record.value}"?`,
//             okText: "Удалить",
//             cancelText: "Отмена",
//             okType: "danger",
//             onOk: async () => {
//                 try {
//                     await services.hashTag.delete(record.id);
//                     fetchAll();
//                     message.success("Хэш-тег удален");
//                 } catch {
//                     message.error("Ошибка при удалении хэш-тега");
//                 }
//             },
//         });
//     };

//     const handleModalClose = () => {
//         setIsModalActive(false);
//         setEditHashTag(null);
//         form.resetFields();
//         setLanguageDetails(CONSTANT_LANGS_DETAILS);
//     };

//     const handleLanguageDetailsChange = (details: IDetailLang[]) => {
//         setLanguageDetails(details);
//     };

//     const handleAdd = () => {
//         setEditHashTag(null);
//         setIsModalActive(true);
//     };

//     const handleSubmit = async () => {
//         try {
//             // Валидируем languageDetails - проверяем что все выбранные языки заполнены
//             const hasEmptyFields = languageDetails.some(
//                 (item) => !item.value.trim()
//             );
//             const englishDetail = languageDetails.find(
//                 (item) => item.lang === "en"
//             );
//             if (!englishDetail) {
//                 message.error("Английский язык обязателен.");
//                 return;
//             }
//             if (hasEmptyFields) {
//                 message.error("Заполните все выбранные языки");
//                 return;
//             }

//             setIsModalLoading(true);

//             const { name, code } = buildEntityField({
//                 englishName: englishDetail.value,
//                 entity: ["code", "name"],
//             });
//             const filledDetails = languageDetails.filter((item) =>
//                 item.value.trim()
//             );
//             const body: IArticleHashTagRequest = {
//                 source: {
//                     Name: name,
//                     Code: code,
//                 },
//                 content: {
//                     details: filledDetails,
//                 },
//             };

//             if (editHashTag) {
//                 // Редактирование существующего хэш-тега
//                 const updatedHashTag = await services.hashTag.update(
//                     editHashTag.id,
//                     body
//                 );

//                 if (updatedHashTag) {
//                     message.success("Хэш-тег обновлен");
//                     fetchAll();
//                     handleModalClose();
//                 } else {
//                     message.error("Ошибка при обновлении хэш-тега");
//                 }
//             } else {
//                 // Создание нового хэш-тега
//                 const newHashTag = await services.hashTag.create(body);

//                 if (newHashTag) {
//                     message.success("Хэш-тег создан");
//                     fetchAll();
//                     handleModalClose();
//                 } else {
//                     message.error("Ошибка при создании хэш-тега");
//                 }
//             }
//         } catch (error) {
//             console.error("Ошибка:", error);
//             message.error("Произошла ошибка при сохранении");
//         } finally {
//             setIsModalLoading(false);
//         }
//     };

//     const columns: ColumnsType<IArticleHashTagFront> = [
//         {
//             title: "ID",
//             dataIndex: "id",
//             key: "id",
//             width: 80,
//         },
//         {
//             title: "Название хэш-тега",
//             dataIndex: "value",
//             key: "value",
//             render: (value: string, record) => (
//                 <Tooltip title={`Системное имя: ${record.name}`}>
//                     <span>{value}</span>
//                 </Tooltip>
//             ),
//         },
//         {
//             title: "Системное имя",
//             dataIndex: "name",
//             key: "name",
//             render: (name: string) => (
//                 <Tag color="green">#{name}</Tag>
//             ),
//         },
//         {
//             title: "Языки",
//             key: "languages",
//             render: (_, record) => (
//                 <Space wrap>
//                     {record.content?.details?.map((detail, index) => (
//                         <Tooltip
//                             key={detail.lang}
//                             title={`${detail.lang.toUpperCase()}: ${detail.value}`}
//                         >
//                             <Tag color="blue">{detail.lang.toUpperCase()}</Tag>
//                         </Tooltip>
//                     ))}
//                 </Space>
//             ),
//         },
//         {
//             title: "Кол-во статей",
//             dataIndex: "articleCount",
//             key: "articleCount",
//             render: (count: number) => (
//                 <Tag color={count > 0 ? "blue" : "default"}>{count} статей</Tag>
//             ),
//         },
//         {
//             title: "Дата создания",
//             dataIndex: "createdAt",
//             key: "createdAt",
//             render: (date: string) => new Date(date).toLocaleDateString('ru-RU'),
//             width: 120,
//         },
//         {
//             title: "Действия",
//             key: "actions",
//             width: 120,
//             render: (_, record) => (
//                 <Space>
//                     <Button
//                         icon={<EditOutlined />}
//                         size="middle"
//                         onClick={() => handleEdit(record)}
//                     />
//                     <Button
//                         danger
//                         icon={<DeleteOutlined />}
//                         size="middle"
//                         onClick={() => handleDelete(record)}
//                         disabled={record.articleCount > 0}
//                     />
//                 </Space>
//             ),
//         },
//     ];

//     return (
//         <>
//             <Card
//                 extra={
//                     <Space>
//                         <Button
//                             type="primary"
//                             icon={<PlusOutlined />}
//                             onClick={handleAdd}
//                         >
//                             Добавить хэш-тег
//                         </Button>
//                         <Button
//                             icon={<ReloadOutlined />}
//                             onClick={() => {
//                                 message.info("Обновлено");
//                                 fetchAll();
//                             }}
//                             loading={isLoading}
//                         />
//                     </Space>
//                 }
//                 title="Управление хэш-тегами статей"
//             >
//                 <Space style={{ marginBottom: 16 }}>
//                     <Search
//                         placeholder="Поиск по ID"
//                         onSearch={(value) => {
//                             if (!value) return fetchAll();
//                             fetchById(value);
//                         }}
//                         allowClear
//                         loading={isLoading}
//                         style={{ width: 200 }}
//                     />
//                     <Search
//                         placeholder="Поиск по названию или системному имени"
//                         onSearch={(value) => {
//                             if (!value) {
//                                 fetchAll();
//                                 return;
//                             }
//                             // Локальный поиск
//                             const filtered = MOCK_HASH_TAGS.filter(tag => 
//                                 tag.value.toLowerCase().includes(value.toLowerCase()) ||
//                                 tag.name.toLowerCase().includes(value.toLowerCase())
//                             );
//                             setHashTags(filtered);
//                         }}
//                         allowClear
//                         style={{ width: 300 }}
//                     />
//                 </Space>

//                 <Table
//                     columns={columns}
//                     dataSource={hashTags}
//                     rowKey="id"
//                     pagination={{ 
//                         pageSize: 10,
//                         showSizeChanger: true,
//                         showQuickJumper: true,
//                         showTotal: (total, range) => 
//                             `Показано ${range[0]}-${range[1]} из ${total} хэш-тегов`
//                     }}
//                     loading={isLoading}
//                 />
//             </Card>

//             <Modal
//                 title={
//                     editHashTag
//                         ? "Редактировать хэш-тег статьи"
//                         : "Добавить хэш-тег статьи"
//                 }
//                 open={isModalActive}
//                 onOk={handleSubmit}
//                 onCancel={handleModalClose}
//                 width={700}
//                 okText={editHashTag ? "Сохранить" : "Создать"}
//                 cancelText="Отмена"
//                 confirmLoading={isModalLoading}
//             >
//                 <Form form={form} layout="vertical">
//                     <LanguageManagerBlock
//                         value={languageDetails}
//                         onChange={handleLanguageDetailsChange}
//                         required={true}
//                     />
//                 </Form>
//             </Modal>
//         </>
//     );
// };