import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import MultipleFileSeparateInput from "./component/MultipleFileSeparateInput";
import MultipleFile from "./Pages/MultipleFile";
import SeparateInput from "./Pages/SeparateInput";
const App = () => {
    return (
        <>       
            <ul style={{"display": "flex", "justifyContent": "center"}}>
              <li style={{"listStyle": "none", "textDecoration": "underline", "marginRight":"20px"}}>
                <Link to="/">Multiple file with separate upload input</Link> 
              </li>
              <li style={{"listStyle":"none", "textDecoration": "underline", }}>
                <Link to={"/multipleFile"}>Multiple file upload single file input</Link> 
              </li>
            </ul>
            <Routes>
                <Route path="/" element={<SeparateInput />} />
                <Route path="/multipleFile" element={<MultipleFile />} />
            </Routes>
        </>
    );
};

export default App;
