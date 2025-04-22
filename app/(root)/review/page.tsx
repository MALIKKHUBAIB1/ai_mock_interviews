"use client";
import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { generateContent } from "@/app/api/review/route";

const App = () => {
  const [code, setCode] = useState<string>(
    `function sum() {\n  return 1 + 1;\n}`
  );
  const [review, setReview] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      const review = await generateContent(code); // Pass code to AI for review
      setReview(review); // Set the AI's review in the state
    } catch (error) {
      console.error("Error reviewing code:", error);
    }
  }

  return (
    <div className="min-h-screen  text-white flex items-center justify-center">
      {/* Welcome Card */}
      {!showModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-[#1f2937] p-8 rounded-xl shadow-lg max-w-md w-full text-center"
        >
          <h1 className="text-2xl font-bold mb-4">
            Welcome to AI Code Reviewer
          </h1>
          <p className="text-gray-300 mb-6">
            Click below to open the editor and get feedback on your code.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-500 hover:bg-indigo-600 px-6 py-2 rounded-lg font-semibold"
          >
            Open Editor
          </button>
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-screen h-screen bg-[#1a1a1a] p-4 overflow-hidden flex flex-col"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg z-50"
              >
                Close
              </button>

              {/* Editor + Review Panels */}
              <main className="flex flex-col md:flex-row gap-4 w-full h-full box-border">
                {/* Editor Panel */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col flex-1 min-w-0 bg-black rounded-xl relative overflow-hidden"
                >
                  <div className="flex-1 overflow-auto bg-[#0c0c0c] rounded-xl p-2 border border-amber-50">
                    <Editor
                      value={code}
                      onValueChange={(newCode) => setCode(newCode)}
                      highlight={(code) =>
                        prism.highlight(
                          code,
                          prism.languages.javascript,
                          "javascript"
                        )
                      }
                      padding={16}
                      style={{
                        fontFamily: '"Fira Code", monospace',
                        fontSize: 16,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={reviewCode}
                    className="absolute bottom-4 right-4 bg-indigo-100 text-black font-medium py-2 px-6 rounded-xl cursor-pointer transition-all"
                  >
                    Review
                  </motion.button>
                </motion.div>

                {/* Review Panel */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 min-w-0 bg-[#343434] rounded-xl p-4 overflow-auto text-white text-base md:text-lg"
                >
                  <Markdown rehypePlugins={[rehypeHighlight]}>
                    {review}
                  </Markdown>
                </motion.div>
              </main>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
