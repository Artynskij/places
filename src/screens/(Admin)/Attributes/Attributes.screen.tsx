"use client";
import React, { useState } from "react";
import {
    Table,
    Input,
    Button,
    Space,
    Tag,
    Typography,
    Card,
    message,
    Modal,
    Select,
    Dropdown,
    MenuProps,
} from "antd";
import {
    EditOutlined,
    GlobalOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    MoreOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { ITagBlockFront, ITagFront, ICategoryFront } from "@/lib/models";

const { Text } = Typography;
const { Option } = Select;

// Моковые данные
const mockTagData: ITagBlockFront[] = [
    {
        groupKey: {
            id: "1",
            key: "cuisine",
            value: "Кухня",
        },
        tags: [
            {
                id: 1,
                key: "italian",
                value: "Итальянская кухня",
                secondaryValue: "Italian cuisine",
                iconName: "🍝",
                count: 45,
            },
            {
                id: 2,
                key: "japanese",
                value: "Японская кухня",
                secondaryValue: "Japanese cuisine",
                iconName: "🍣",
                count: 32,
            },
            {
                id: 3,
                key: "mexican",
                value: "Мексиканская кухня",
                secondaryValue: "Mexican cuisine",
                iconName: "🌮",
                count: 28,
            },
        ],
    },
    {
        groupKey: {
            id: "2",
            key: "amenities",
            value: "Удобства",
        },
        tags: [
            {
                id: 4,
                key: "wifi",
                value: "Бесплатный Wi-Fi",
                secondaryValue: "Free Wi-Fi",
                iconName: "📶",
                count: 120,
            },
            {
                id: 5,
                key: "parking",
                value: "Парковка",
                secondaryValue: "Parking",
                iconName: "🅿️",
                count: 89,
            },
            {
                id: 6,
                key: "terrace",
                value: "Терраса",
                secondaryValue: "Terrace",
                iconName: "🌿",
                count: 67,
            },
        ],
    },
];

// Моковые категории для выбора
const MOCK_CATEGORIES: ICategoryFront[] = [
    { id: "1", key: "cuisine", value: "Кухня" },
    { id: "2", key: "amenities", value: "Удобства" },
    { id: "3", key: "price", value: "Ценовая категория" },
    { id: "4", key: "atmosphere", value: "Атмосфера" },
];

// Моковые языки
const LANGUAGES = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

// Моковые переводы для тегов
const MOCK_TRANSLATIONS: Record<string, Record<string, string>> = {
    '1': {
        'ru': 'Итальянская кухня',
        'en': 'Italian cuisine',
        'es': 'Cocina italiana',
        'fr': 'Cuisine italienne',
        'de': 'Italienische Küche'
    },
    '2': {
        'ru': 'Японская кухня',
        'en': 'Japanese cuisine',
        'es': 'Cocina japonesa',
        'fr': 'Cuisine japonaise',
        'de': 'Japanische Küche'
    },
    '4': {
        'ru': 'Бесплатный Wi-Fi',
        'en': 'Free Wi-Fi',
        'es': 'Wi-Fi gratuito',
        'fr': 'Wi-Fi gratuit',
        'de': 'Kostenloses WLAN'
    },
};

export const AttributesAdminScreen: React.FC = () => {
    const [data, setData] = useState<ITagBlockFront[]>(mockTagData);
    const [hiddenGroups, setHiddenGroups] = useState<Set<string>>(new Set());
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('edit');
    const [currentTag, setCurrentTag] = useState<ITagFront | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState('ru');
    const [formData, setFormData] = useState({
        key: '',
        value: '',
        secondaryValue: '',
        iconName: '',
        categoryId: '',
    });

    // Дропдаун меню для групп
    const getGroupDropdownItems = (groupKey: string): MenuProps['items'] => [
        {
            key: 'toggle_visibility',
            label: hiddenGroups.has(groupKey) ? 'Показать группу' : 'Скрыть группу',
            icon: hiddenGroups.has(groupKey) ? <EyeOutlined /> : <EyeInvisibleOutlined />,
            onClick: () => toggleGroupVisibility(groupKey),
        },
        {
            key: 'add_tag',
            label: 'Добавить тег в группу',
            icon: <PlusOutlined />,
            onClick: () => handleAddTagToGroup(groupKey),
        },
    ];

    const toggleGroupVisibility = (groupKey: string) => {
        setHiddenGroups(prev => {
            const newHidden = new Set(prev);
            if (newHidden.has(groupKey)) {
                newHidden.delete(groupKey);
                message.success(`Группа "${groupKey}" показана`);
            } else {
                newHidden.add(groupKey);
                message.success(`Группа "${groupKey}" скрыта`);
            }
            return newHidden;
        });
    };

    const handleAddTagToGroup = (groupKey: string) => {
        const group = data.find(g => g.groupKey.key === groupKey);
        if (!group) return;

        setModalMode('create');
        setCurrentTag(null);
        setSelectedLanguage('ru');
        setFormData({
            key: '',
            value: '',
            secondaryValue: '',
            iconName: '',
            categoryId: group.groupKey.id,
        });
        setModalVisible(true);
    };

    const openEditModal = (tag: ITagFront, groupKey: string) => {
        const group = data.find(g => g.groupKey.key === groupKey);
        if (!group) return;

        setModalMode('edit');
        setCurrentTag(tag);
        setSelectedLanguage('ru');
        setFormData({
            key: tag.key,
            value: tag.value,
            secondaryValue: tag.secondaryValue || '',
            iconName: tag.iconName || '',
            categoryId: group.groupKey.id,
        });
        setModalVisible(true);
    };

    const handleLanguageChange = (language: string) => {
        setSelectedLanguage(language);
        if (currentTag) {
            // Загружаем перевод для выбранного языка
            const translation = MOCK_TRANSLATIONS[currentTag.id.toString()]?.[language] || '';
            if (language === 'ru') {
                setFormData(prev => ({ ...prev, value: translation || currentTag.value }));
            } else if (language === 'en') {
                setFormData(prev => ({ ...prev, secondaryValue: translation || currentTag.secondaryValue || '' }));
            }
        }
    };

    const handleSave = () => {
        if (!formData.key || !formData.value) {
            message.error('Заполните обязательные поля: ключ и значение');
            return;
        }

        if (modalMode === 'edit' && currentTag) {
            // Редактирование существующего тега
            setData(prevData =>
                prevData.map(group => ({
                    ...group,
                    tags: group.tags.map(tag =>
                        tag.id === currentTag.id
                            ? {
                                ...tag,
                                key: formData.key,
                                value: formData.value,
                                secondaryValue: formData.secondaryValue,
                                iconName: formData.iconName,
                            }
                            : tag
                    ),
                }))
            );
            message.success('Тег успешно обновлен');
        } else {
            // Создание нового тега
            const newTag: ITagFront = {
                id: Date.now(), // Временный ID
                key: formData.key,
                value: formData.value,
                secondaryValue: formData.secondaryValue,
                iconName: formData.iconName,
                count: 0,
            };

            setData(prevData =>
                prevData.map(group =>
                    group.groupKey.id === formData.categoryId
                        ? { ...group, tags: [...group.tags, newTag] }
                        : group
                )
            );
            message.success('Тег успешно создан');
        }

        setModalVisible(false);
    };

    const handleDeleteTag = (tagId: number | string, groupKey: string) => {
        setData(prevData =>
            prevData.map(group =>
                group.groupKey.key === groupKey
                    ? { ...group, tags: group.tags.filter(tag => tag.id !== tagId) }
                    : group
            )
        );
        message.success('Тег удален');
    };

    const columns = (groupKey: string) => [
        {
            title: "Иконка",
            dataIndex: "iconName",
            key: "icon",
            width: 80,
            render: (iconName: string | null) => (
                <span style={{ fontSize: "20px" }}>{iconName || "🏷️"}</span>
            ),
        },
        {
            title: "Ключ",
            dataIndex: "key",
            key: "key",
            width: 120,
            render: (text: string) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: "Русская версия",
            dataIndex: "value",
            key: "value",
            render: (text: string) => <Text strong>{text}</Text>,
        },
        {
            title: "Английская версия",
            dataIndex: "secondaryValue",
            key: "secondaryValue",
            render: (text: string | null) => (
                <Space>
                    <GlobalOutlined style={{ color: "#1890ff" }} />
                    <Text type="secondary">{text || "Не указано"}</Text>
                </Space>
            ),
        },
        {
            title: "Кол-во использований",
            dataIndex: "count",
            key: "count",
            width: 120,
            render: (count: number | null) => (
                <Tag color={count ? "green" : "default"}>{count || 0}</Tag>
            ),
        },
        {
            title: "Действия",
            key: "actions",
            width: 120,
            render: (_: any, record: ITagFront) => (
                <Space size="small">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => openEditModal(record, groupKey)}
                        size="small"
                    >
                        Редактировать
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => handleDeleteTag(record.id, groupKey)}
                        size="small"
                    >
                        Удалить
                    </Button>
                </Space>
            ),
        },
    ];

    const filteredData = data.filter(group => !hiddenGroups.has(group.groupKey.key));

    return (
        <Card 
            title={
                <Space>
                    Управление тегами
                    <Tag>{filteredData.length} из {data.length} групп</Tag>
                </Space>
            } 
            style={{ margin: 16 }}
            extra={
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setModalMode('create');
                        setCurrentTag(null);
                        setSelectedLanguage('ru');
                        setFormData({
                            key: '',
                            value: '',
                            secondaryValue: '',
                            iconName: '',
                            categoryId: MOCK_CATEGORIES[0]?.id || '',
                        });
                        setModalVisible(true);
                    }}
                >
                    Добавить тег
                </Button>
            }
        >
            {/* Список групп с дропдаунами */}
            {data.map((group) => (
                <Card
                    key={group.groupKey.id}
                    type="inner"
                    title={
                        <Space>
                            <Tag color={hiddenGroups.has(group.groupKey.key) ? "default" : "purple"}>
                                {group.groupKey.key}
                            </Tag>
                            <Text strong>{group.groupKey.value}</Text>
                            <Text type="secondary">({group.tags.length} тегов)</Text>
                        </Space>
                    }
                    style={{ 
                        marginBottom: 16,
                        display: hiddenGroups.has(group.groupKey.key) ? 'none' : 'block'
                    }}
                    extra={
                        <Dropdown
                            menu={{ items: getGroupDropdownItems(group.groupKey.key) }}
                            placement="bottomRight"
                        >
                            <Button type="text" icon={<MoreOutlined />} />
                        </Dropdown>
                    }
                >
                    <Table
                        dataSource={group.tags}
                        columns={columns(group.groupKey.key)}
                        rowKey="id"
                        pagination={false}
                        size="middle"
                        scroll={{ x: 800 }}
                    />
                </Card>
            ))}

            {/* Модальное окно редактирования/создания */}
            <Modal
                title={
                    <Space>
                        {modalMode === 'edit' ? 'Редактирование тега' : 'Создание тега'}
                        {currentTag && <Tag color="blue">{currentTag.key}</Tag>}
                    </Space>
                }
                open={modalVisible}
                onOk={handleSave}
                onCancel={() => setModalVisible(false)}
                okText={modalMode === 'edit' ? 'Обновить' : 'Создать'}
                cancelText="Отмена"
                width={700}
            >
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                    {/* Выбор языка */}
                    <div>
                        <Text strong>Язык редактирования: </Text>
                        <Select
                            value={selectedLanguage}
                            onChange={handleLanguageChange}
                            style={{ width: 200 }}
                        >
                            {LANGUAGES.map(lang => (
                                <Option key={lang.code} value={lang.code}>
                                    <Space>
                                        <span>{lang.flag}</span>
                                        <span>{lang.name}</span>
                                    </Space>
                                </Option>
                            ))}
                        </Select>
                    </div>

                    {/* Выбор категории */}
                    <div>
                        <Text strong>Категория: </Text>
                        <Select
                            value={formData.categoryId}
                            onChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
                            style={{ width: 250 }}
                            disabled={modalMode === 'edit'}
                        >
                            {MOCK_CATEGORIES.map(category => (
                                <Option key={category.id} value={category.id}>
                                    {category.value} ({category.key})
                                </Option>
                            ))}
                        </Select>
                    </div>

                    {/* Основные поля */}
                    <div>
                        <Text strong>Ключ тега: </Text>
                        <Input
                            value={formData.key}
                            onChange={(e) => setFormData(prev => ({ ...prev, key: e.target.value }))}
                            placeholder="Например: italian_cuisine"
                            style={{ width: 250, marginLeft: 8 }}
                        />
                    </div>

                    <div>
                        <Text strong>Иконка: </Text>
                        <Input
                            value={formData.iconName}
                            onChange={(e) => setFormData(prev => ({ ...prev, iconName: e.target.value }))}
                            placeholder="Эмодзи или название иконки"
                            style={{ width: 250, marginLeft: 8 }}
                        />
                    </div>

                    {/* Поля в зависимости от выбранного языка */}
                    {selectedLanguage === 'ru' && (
                        <div>
                            <Text strong>Русское название: </Text>
                            <Input.TextArea
                                value={formData.value}
                                onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                                placeholder="Введите название на русском"
                                rows={2}
                                style={{ marginTop: 8, width: '100%' }}
                            />
                        </div>
                    )}

                    {selectedLanguage === 'en' && (
                        <div>
                            <Text strong>Английское название: </Text>
                            <Input.TextArea
                                value={formData.secondaryValue}
                                onChange={(e) => setFormData(prev => ({ ...prev, secondaryValue: e.target.value }))}
                                placeholder="Введите название на английском"
                                rows={2}
                                style={{ marginTop: 8, width: '100%' }}
                            />
                        </div>
                    )}

                    {!['ru', 'en'].includes(selectedLanguage) && (
                        <div>
                            <Text strong>
                                Перевод на {LANGUAGES.find(lang => lang.code === selectedLanguage)?.name}:
                            </Text>
                            <Input.TextArea
                                value={MOCK_TRANSLATIONS[currentTag?.id.toString() || '']?.[selectedLanguage] || ''}
                                onChange={(e) => {
                                    // Здесь будет логика сохранения перевода для других языков
                                }}
                                placeholder={`Введите перевод на ${LANGUAGES.find(lang => lang.code === selectedLanguage)?.name}`}
                                rows={2}
                                style={{ marginTop: 8, width: '100%' }}
                            />
                        </div>
                    )}
                </Space>
            </Modal>
        </Card>
    );
};