import { useState } from "react";

const ViewProducts = () => {
    const dummyProducts = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        name: `Product ${index + 1}`,
        description: `Description for product ${index + 1}`,
        price: (index + 1) * 10,
        stock: (index + 1) * 5,
        status: index % 2 === 0 ? "Available" : "Unavailable",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        updated_by: `User ${index + 1}`,
        created_by: `User ${index + 1}`,
    }));

    const [products, setProducts] = useState(dummyProducts);

    const styles = {
        container: {
            backgroundColor: '#f9fafb',
            borderRadius: '12px',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)',
            padding: '24px',
            margin: '20px auto',
            maxWidth: '1200px',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
        },
        headerTitle: {
            color: '#2d3748',
            fontWeight: '700',
            fontSize: '28px',
            margin: '0',
            background: 'linear-gradient(90deg, #3182ce, #805ad5)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
        },
        tableContainer: {
            overflowX: 'auto',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
        },
        table: {
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '0',
            overflow: 'hidden',
        },
        th: {
            backgroundColor: '#f7fafc',
            padding: '16px 20px',
            fontWeight: '600',
            textAlign: 'left',
            color: '#4a5568',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            position: 'sticky',
            top: '0',
            boxShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
            whiteSpace: 'nowrap',
            userSelect: 'none',
        },
        td: {
            padding: '16px 20px',
            borderTop: '1px solid #edf2f7',
            color: '#4a5568',
            transition: 'background-color 0.2s',
        },
        trEven: {
            backgroundColor: '#fafafa',
        },
        trHover: {
            backgroundColor: '#f0f9ff',
        },
        statusBadgeAvailable: {
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: '20px',
            fontWeight: '500',
            fontSize: '12px',
            textAlign: 'center',
            backgroundColor: '#c6f6d5',
            color: '#276749',
        },
        statusBadgeUnavailable: {
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: '20px',
            fontWeight: '500',
            fontSize: '12px',
            textAlign: 'center',
            backgroundColor: '#fed7d7',
            color: '#9b2c2c',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.headerTitle}>View Products</h2>
            </div>
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Description</th>
                            <th style={styles.th}>Price</th>
                            <th style={styles.th}>Stock</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Created At</th>
                            <th style={styles.th}>Updated At</th>
                            <th style={styles.th}>Updated By</th>
                            <th style={styles.th}>Created By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id} style={index % 2 === 0 ? styles.trEven : {}}>
                                <td style={styles.td}>{product.id}</td>
                                <td style={styles.td}>{product.name}</td>
                                <td style={styles.td}>{product.description}</td>
                                <td style={styles.td}>{product.price}</td>
                                <td style={styles.td}>{product.stock}</td>
                                <td style={styles.td}>
                                    <span style={product.status === "Available" ? styles.statusBadgeAvailable : styles.statusBadgeUnavailable}>
                                        {product.status}
                                    </span>
                                </td>
                                <td style={styles.td}>{product.created_at}</td>
                                <td style={styles.td}>{product.updated_at}</td>
                                <td style={styles.td}>{product.updated_by}</td>
                                <td style={styles.td}>{product.created_by}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewProducts;
