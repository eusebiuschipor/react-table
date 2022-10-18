import React, { useState, useEffect, useRef } from 'react';

import './Table.css';

const Table = ({ data }) => {
    const [masterChecked, setMasterChecked] = useState(false);
    const [items, setItems] = useState(data);
    const [selectedItems, setSelectedItems] = useState([]);

    const AVAILABLE_STATUS = 'available';

    const masterCheckedRef = useRef();

    useEffect(() => {
        items.map(item => ({ ...item, selected: false }));
        setItems([...items]);
    }, []);

    useEffect(() => {
        const selectedItems = items.filter(el => el.selected)
        setSelectedItems(selectedItems);
        setMasterChecked(selectedItems.length === items.length);
        masterCheckedRef.current.indeterminate = selectedItems.length && selectedItems.length < items.length;
    }, [items]);

    const handleMasterChange = (event) => {
        items.map(item => (item.selected = event.target.checked));
        setItems([...items]);
    };

    const onItemCheck = (event, elementIndex) => {
        items[elementIndex].selected = event.target.checked;
        setItems([...items]);
    }
    
    const downloadSelected = () => {
        let downloadMessage = '';
        let index = 0;
        selectedItems.forEach(item => {
            if (item.status === AVAILABLE_STATUS) {
                downloadMessage += `${++index}: path: ${item.path} device: ${item.device} `; 
            }
        });

        alert(downloadMessage.length ? downloadMessage : 'None available selected');
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-hover">
                        <thead>
                            <tr className="info-line">
                                <td>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={masterChecked}
                                        onChange={(e) => handleMasterChange(e)}
                                        ref={masterCheckedRef} />
                                </td>
                                <td className="selected-info">
                                    {selectedItems.length ? `Selected ${selectedItems.length}` : `None Selected`}
                                </td>
                                <td>
                                    <button 
                                        className="download-button"
                                        onClick={() => downloadSelected()}>
                                        <i className="fa-solid fa-download download-icon"></i>
                                        Download Selected
                                    </button>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Device</th>
                                <th>Path</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr 
                                    key={index} 
                                    className={item.selected ? "selected" : ""}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={item.selected || false}
                                            className="form-check-input"
                                            onChange={(e) => onItemCheck(e, index)} />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.device}</td>
                                    <td className="path-td">
                                        {item.path}
                                        <div className={`circle ${item.status}`}></div>
                                    </td>
                                    <td>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Table;

