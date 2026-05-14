import EditorPackage from "react-simple-code-editor";
import Prism from "prismjs";

const BACKENDAPI = import.meta.env.VITE_API_URL;

import "prismjs/themes/prism-tomorrow.css";

import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";

import React, { useState } from 'react'
import axios from "axios";
import Markdown from "react-markdown";

const Editor = EditorPackage.default;

function App() {

  const [language, setLanguage] = useState('C')

  const [loading, setLoading] = useState(false)

  const [code, setCode] = useState(
    `#include <stdio.h>

    int main() {
        printf("Hello Raju");
        return 0;
    }`
      );

  const [review, setReview] = useState("");

  const languages = ['C', 'C++', 'JAVA', 'JavaScript', 'PYTHON']

  const prismLanguages = {
    'C': 'c',
    'C++': 'cpp',
    'JAVA': 'java',
    'JavaScript': 'javascript',
    'PYTHON': 'python'
  };


  const handleReview = async () => {
    if (!code.trim()) {
        setReview("Raju bhai code to likh pehle 😭");
        return;
    }

    setLoading(true)
    try {
      const res = await axios.post(`${BACKENDAPI}/ai/get-review`, {code, language});
      setReview(res.data.review);
    } catch (error) {
        setReview("Backend ne raju ko diya tapa tap!");
    }finally{
      setLoading(false)
    }
  }

  const handleLangChange = (lang) => {
    setLanguage(lang)
  
    switch (lang) {

        case "C":
            setCode(
`#include <stdio.h>

int main() {

    printf("Hello Raju");

    return 0;
}`
            );
            break;

        case "C++":
            setCode(
`#include <iostream>

using namespace std;

int main() {

    cout << "Raju chuha chala pahad khodne";

    return 0;
}`
            );
            break;

        case "JAVA":
            setCode(
`public class Main {

    public static void main(String[] args) {

        System.out.println("Aukat se bahar  jaara!");

    }
}`
            );
            break;

        case "JavaScript":
            setCode(
`function main() {

    console.log("Javascript sikhe gi bachhi");

}

main();`
            );
            break;

        case "PYTHON":
            setCode(
`def main():

    print("python padhne ki ichaa hori")


main()`
            );
            break;

        default:
            setCode("");
    }

  }


  return (
    <div className="container">

      <nav>
        <div className='logo'>Raju_Codes;</div>

        <div className="languages-selector">
          {
              languages.map((lang, ind) => (
                  <div key={ind} className="lang"
                  onClick={() => handleLangChange(lang)}>
                      {lang}
                  </div>
              ))
          }
      </div>
      </nav>

      <main>
        <div className="left">
          <h4 className='selected-lang' >{ language }</h4>
          <div className="code-container">

            <Editor
              value={code}

              onValueChange={(code) => setCode(code)}

              highlight={(code) =>
                Prism.highlight(
                  code,
                  Prism.languages[prismLanguages[language]],
                  prismLanguages[language]
                )
              }

              padding={10}

              textareaClassName="editor-textarea"

              className="editor"

              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                minHeight: "500px",
                backgroundColor: "#1e1e1e",
                color: "#fff",
                borderRadius: "10px",
              }}
            />

          </div>
          <div className={`review-btn ${loading ? "disabled" : ""}`}
    onClick={!loading ? handleReview : null} >review</div>
        </div>
        <div className="right">
          {
            loading ? (
              <h1>Loading</h1>
            ) : (
              <Markdown>
                { review }
              </Markdown>
            )
          }
          
        </div>
      </main>

    </div>
  )
}

export default App