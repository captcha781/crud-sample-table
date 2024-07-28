import { Fragment, useEffect, useState } from 'react';
import './App.css';

const initialFormState = {
  id: '',
  machineId: '',
  maintainedBy: '',
  machineIp: '',
};

function App() {
  const [inputState, setInputState] = useState(initialFormState);
  const [data, setData] = useState(JSON.parse(localStorage.getItem('table_data_sample')) || []);
  const [editIndex, setEditIndex] = useState([]);
  const [editStates, setEditStates] = useState({});

  const handleChange = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditChange = (e, index) => {
    setEditStates({
      ...editStates,
      [index]: {
        ...editStates[index],
        [e.target.name]: e.target.value,
      },
    });
  };

  const saveHandler = () => {
    setData([...data, inputState]);
    setInputState(initialFormState);
  };

  const cancelHandler = () => {
    setInputState(initialFormState);
  };

  const editHandler = (index) => {
    setEditIndex((prev) => [...new Set([...prev, index])]);
    setEditStates((prev) => ({
      ...prev,
      [index]: data[index],
    }));
  };

  const cancelEdit = (index) => {
    setEditIndex((prev) => {
      const newEditIndex = prev.filter((i) => i !== index);
      return newEditIndex;
    });
    setEditStates((prev) => {
      const newEditStates = { ...prev };
      delete newEditStates[index];
      return newEditStates;
    });
  };

  const saveEdit = (index) => {
    const updatedData = [...data];
    updatedData[index] = editStates[index];
    setData(updatedData);
    cancelEdit(index);
  };

  const deleteHandler = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleHardReset = () => {
    localStorage.clear();
    setData([]);
  };

  useEffect(() => {
    localStorage.setItem('table_data_sample', JSON.stringify(data));
  }, [data]);

  return (
    <div className="App">
      <div className="container">
        <div className="button-container">
          <button className="reset-button" onClick={handleHardReset}>
            Reset Data Table
          </button>
        </div>
        <table className="table-container">
          <thead className="table-head">
            <tr>
              <th>ID</th>
              <th>Machine ID</th>
              <th>Maintained By</th>
              <th>Machine IP</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {data.length > 0 &&
              data.map((item, index) => (
                <tr key={index}>
                  <td className="input-cell">
                    <input
                      type="text"
                      placeholder="ID"
                      name="id"
                      value={!editIndex.includes(index) ? item.id : editStates[index]?.id || ''}
                      onChange={(e) => handleEditChange(e, index)}
                      className="full-size-input"
                      disabled={!editIndex.includes(index)}
                    />
                  </td>
                  <td className="input-cell">
                    <input
                      type="text"
                      placeholder="Machine ID"
                      name="machineId"
                      value={!editIndex.includes(index) ? item.machineId : editStates[index]?.machineId || ''}
                      onChange={(e) => handleEditChange(e, index)}
                      className="full-size-input"
                      disabled={!editIndex.includes(index)}
                    />
                  </td>
                  <td className="input-cell">
                    <input
                      type="text"
                      placeholder="Maintained By"
                      name="maintainedBy"
                      value={!editIndex.includes(index) ? item.maintainedBy : editStates[index]?.maintainedBy || ''}
                      onChange={(e) => handleEditChange(e, index)}
                      className="full-size-input"
                      disabled={!editIndex.includes(index)}
                    />
                  </td>
                  <td className="input-cell">
                    <input
                      type="text"
                      placeholder="Machine IP"
                      name="machineIp"
                      value={!editIndex.includes(index) ? item.machineIp : editStates[index]?.machineIp || ''}
                      onChange={(e) => handleEditChange(e, index)}
                      className="full-size-input"
                      disabled={!editIndex.includes(index)}
                    />
                  </td>
                  <td className="actions-cell">
                    {editIndex.includes(index) ? (
                      <Fragment>
                        <button onClick={() => saveEdit(index)}>Save</button>
                        <button onClick={() => cancelEdit(index)}>Cancel</button>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <button onClick={() => editHandler(index)}>Edit</button>
                        <button onClick={() => deleteHandler(index)}>Delete</button>
                      </Fragment>
                    )}
                  </td>
                </tr>
              ))}

            <tr>
              <td colSpan={5} style={{ height: '1.5rem' }}>
                {''}
              </td>
            </tr>
            <tr>
              <td className="input-cell">
                <input
                  type="text"
                  placeholder="ID"
                  name="id"
                  value={inputState.id}
                  onChange={handleChange}
                  className="full-size-input"
                />
              </td>
              <td className="input-cell">
                <input
                  type="text"
                  placeholder="Machine ID"
                  name="machineId"
                  value={inputState.machineId}
                  onChange={handleChange}
                  className="full-size-input"
                />
              </td>
              <td className="input-cell">
                <input
                  type="text"
                  placeholder="Maintained By"
                  name="maintainedBy"
                  value={inputState.maintainedBy}
                  onChange={handleChange}
                  className="full-size-input"
                />
              </td>
              <td className="input-cell">
                <input
                  type="text"
                  placeholder="Machine IP"
                  name="machineIp"
                  value={inputState.machineIp}
                  onChange={handleChange}
                  className="full-size-input"
                />
              </td>
              <td className="actions-cell">
                <button onClick={saveHandler}>Save</button>
                <button onClick={cancelHandler}>Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
