import { useState } from "react";
import { Button, Group } from "@mantine/core";
import Table1 from "./components/Table1";
import Table2 from "./components/Table2";

function App() {
    const [showFirstTable, setShowFirstTable] = useState(true);
    const [showSecondTable, setShowSecondTable] = useState(false);

    return (
        <div className="flex flex-col gap-10">
            <div className="flex gap-x-10 items-center justify-center ">
                <Button
                    variant={showFirstTable ? "filled" : "outline"}
                    onClick={() => {
                        setShowFirstTable(true);
                        setShowSecondTable(false);
                    }}
                >
                    Show First Table
                </Button>
                <Button
                    variant={showSecondTable ? "filled" : "outline"}
                    onClick={() => {
                        setShowFirstTable(false);
                        setShowSecondTable(true);
                    }}
                >
                    Show Second Table
                </Button>
            </div>
            <div>
                {showFirstTable && (
                    <>
                        <h1 >First Table</h1>
                        <Table1 />
                    </>
                )}
                {showSecondTable && (
                    <>
                        <h1>Second Table</h1>
                        <Table2 />
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
