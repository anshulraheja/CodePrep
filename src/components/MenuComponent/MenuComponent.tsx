/**
 * Build a Menu component in React that fetches menu data from a mock API and displays it in a structured UI.
 * Fetch menu data on component mount
 * Display categories and items
 * Each category should be collapsible
 * Loading & Error States
 * Clicking an item highlights it
 * Add search input, filter, debounce
 * Keyboard Navigation: Arrow keys to navigate, Enter to select
 * Avoid unnecessary re-renders - Memoization
 */
import React, { useEffect, useState } from 'react';

type MenuItem = {
    id: number;
    name: string;
};

type MenuCategory = {
    id: number;
    name: string;
    items: MenuItem[];
};

type MenuNode = {
    id: number;
    name: string;
    children?: MenuNode[];
};

const fetchMenu = (): Promise<MenuNode[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...mockData]);
        }, 500);
    });
};

const MenuComponent = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<MenuNode[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const menuData = await fetchMenu();
                console.log(menuData);
                setData(menuData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load menu');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const RenderMenu = ({ nodes }) => {
        const [expanded, setExpanded] = useState<Record<number, boolean>>({});

        const handleMenuItemToggle = (nodeId: number) => {
            setExpanded((prev) => ({
                ...prev,
                [nodeId]: !prev[nodeId],
            }));
        };

        return nodes.map((node) => {
            const isParent = node.items?.length > 0;
            const isExpanded = expanded[node.id];

            return (
                <li key={node.id}>
                    <span onClick={() => handleMenuItemToggle(node.id)} style={{ cursor: 'pointer' }}>
                        {node.name} {isParent ? (isExpanded ? '▼' : '▶') : ''}
                    </span>
                    {isParent && isExpanded && (
                        <ul>
                            {node.items.map((item) => (
                                <li key={item.id}>{item.name}</li>
                            ))}
                        </ul>
                    )}
                </li>
            );
        });
    };

    return (
        <div>
            <h1>Menu Component</h1>

            <div>
                {loading && <div>Loading....</div>}
                {error && <div>Error: {error}</div>}
                {!loading && !error && data && (
                    <ul>
                        <RenderMenu nodes={data} />
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MenuComponent;

const MenuItem = ({ item }) => {
    return <li>{item.name}</li>;
};

// Mock data
// GET /api/menu
const mockData = [
    {
        id: 1,
        name: 'Food',
        items: [
            { id: 11, name: 'Pizza' },
            { id: 12, name: 'Burger' },
        ],
    },
    {
        id: 2,
        name: 'Drinks',
        items: [
            { id: 21, name: 'Coke' },
            { id: 22, name: 'Juice' },
        ],
    },
];

const nestedMockData = [
    {
        id: 1,
        name: 'Food',
        children: [
            {
                id: 2,
                name: 'Fast Food',
                children: [{ id: 3, name: 'Burger' }],
            },
        ],
    },
];
