import {useState, useMemo} from "react";
import ReactFlow, {Background, Controls} from "reactflow";
import {Handle, Position} from "reactflow";
import "reactflow/dist/style.css";

const InputNode = ({data}) => (
    <div
        style={{
            padding: 10,
            width: 220,
            border: "1px solid #555",
            borderRadius: 6,
        }}
    >
        <strong>Input Node</strong>

        <textarea
            rows={4}
            style={{width: "100%", marginTop: 6}}
            placeholder="Type your question..."
            value={data.prompt}
            onChange={(e) => data.setPrompt(e.target.value)}
        />

        <Handle type="source" position={Position.Right} />
    </div>
);

const ResultNode = ({data}) => (
    <div
        style={{
            padding: 10,
            width: 220,
            border: "1px solid #555",
            borderRadius: 6,
        }}
    >
        <strong>Result Node</strong>

        <div style={{marginTop: 6, whiteSpace: "pre-wrap"}}>{data.answer}</div>

        <Handle type="target" position={Position.Left} />
    </div>
);

const nodeTypes = {
    inputNode: InputNode,
    resultNode: ResultNode,
};

export default function App() {
    const [prompt, setPrompt] = useState("");
    const [answer, setAnswer] = useState("Waiting for output...");

    const nodes = useMemo(
        () => [
            {
                id: "1",
                type: "inputNode",
                position: {x: 100, y: 150},
                data: {prompt, setPrompt},
            },
            {
                id: "2",
                type: "resultNode",
                position: {x: 450, y: 150},
                data: {answer},
            },
        ],
        [prompt, answer]
    );

    const edges = useMemo(
        () => [{id: "e1-2", source: "1", target: "2", animated: true}],
        []
    );

    const runFlow = async () => {
        if (!prompt) return alert("Enter a prompt");

        setAnswer("Running...");

        try {
            const res = await fetch(
                "https://ai-chat-axc6.onrender.com/api/ask-ai",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({prompt}),
                }
            );

            const data = await res.json();
            setAnswer(data.answer);
        } catch {
            setAnswer("Error fetching response");
        }
    };

    const saveChat = async () => {
        if (
            !prompt ||
            !answer ||
            answer === "Waiting for output..." ||
            answer === "Running..."
        ) {
            return alert("Nothing to save");
        }

        try {
            await fetch("https://ai-chat-axc6.onrender.com/api/save-chat", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    prompt,
                    response: answer,
                }),
            });

            alert("Saved successfully");
        } catch {
            alert("Failed to save");
        }
    };

    return (
        <div style={{width: "100vw", height: "100vh", position: "relative"}}>
            <div
                style={{
                    position: "absolute",
                    zIndex: 10,
                    top: 20,
                    left: 20,
                    display: "flex",
                    gap: "10px",
                }}
            >
                <button onClick={runFlow}>Run Flow</button>
                <button
                    onClick={saveChat}
                    disabled={
                        answer === "Waiting for output..." ||
                        answer === "Running..."
                    }
                >
                    Save
                </button>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}
