import { useState } from 'react';
import './TDCard.css'

export function TDCard({ props, toggleTask, deleteTask, updateTask }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(props.title);
    const [editedText, setEditedText] = useState(props.text);

    function handleEdit() {
        if (isEditing) {
            if (editedTitle.trim() && editedText.trim()) {
                updateTask(props.id, {
                    title: editedTitle,
                    text: editedText
                });
            }
        } else {
            setEditedTitle(props.title);
            setEditedText(props.text);
        }
        setIsEditing(!isEditing);
    };

    function handleCancelEdit() {
        setIsEditing(false);
        // Reset to original values
        setEditedTitle(props.title);
        setEditedText(props.text);
    }

    function handleToggle() {
        toggleTask(props.id);
    };

    function handleDelete() {
        deleteTask(props.id);
    };
    
    return (
        <div className={`TDCard ${props.done ? 'completed' : ''}`}>

            {isEditing ? (
                <div className="card-edit-mode">
                    <div className="edit-field">
                        <label>Title:</label>
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                    </div>

                    <div className="edit-field">
                        <label>Description:</label>
                        <textarea
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                        />
                    </div>

                    <div className="edit-actions">
                        <button className="btn save-btn" onClick={handleEdit}>Save</button>
                        <button className="btn cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="card-title">
                        <h3>{props.title}</h3>
                    </div>

                    <div className="card-description">
                        <p>{props.text}</p>
                    </div>

                    <div className="card-actions">
                        <div className="card-checkbox">
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={props.done}
                                    onChange={handleToggle}
                                />
                                <span className="slider"></span>
                                <span className="labels" data-on="DONE" data-off="TODO"></span>
                            </label>
                        </div>

                        <div className="action-buttons">
                            <button className="btn edit-btn" onClick={handleEdit}>✍️</button>
                            <button className="btn delete-btn" onClick={handleDelete}> ❌ </button>
                        </div>

                    </div>
                </>
            )
            }

        </div>
    );
}