const analysisSelect = document.getElementById("analysis");
speaker_names.forEach((speaker) => {
  const optionElement = document.createElement("option");
  // replace jvs001_m to JVS001 (M)
  optionElement.textContent = speaker.replace(/(\w+)_(\w)/, (match, p1, p2) => `${p1.toUpperCase()} (${p2.toUpperCase()})`);
  optionElement.value = speaker;
  analysisSelect.appendChild(optionElement);
});

const models = {
  "ref": "Reference",
  "nf": "NF (baseline)",
  "e2e-nf": "E2E-NF",
  "e2e-nf-pl": "E2E-NF+",
  "e2e-sifi-nf": "E2E-SiFi-NF",
}

const analysisSynthesisHeader = document.getElementById("analysisSynthesisTable").getElementsByTagName("tr")[0];
const headerCell = document.createElement("th");
headerCell.textContent = "file";
analysisSynthesisHeader.appendChild(headerCell);
for (const model in models) {
  const headerCell = document.createElement("th");
  headerCell.textContent = models[model];
  analysisSynthesisHeader.appendChild(headerCell);
}

const analysisSynthesisTable = document.getElementById("analysisSynthesisTable").getElementsByTagName("tbody")[0];

analysisSelect.addEventListener("change", () => {
  const selectedSpk = analysisSelect.value;
  // [ {name: "speaker", contents: [ {name: "model", contents: [ {name: "file", contents: "path"} ] } ] }, ... ]
  const products = [analysis_synthesis[0].contents.filter((speaker) => speaker.name === analysisSelect.value)[0].contents] || [];

  analysisSynthesisTable.innerHTML = "";

  products.forEach((product) => {
    // 始めのcontentsの長さ=評価サンプル数
    // static/audio/<title>以下のモデルにファイルが等しく存在すると仮定
    for (let i = 0; i < products[0][0].contents.length; i++) {
      const row = analysisSynthesisTable.insertRow();
      for (const model_name in models) {
        const contents = products[0].filter((model) => model.name === model_name)[0].contents;
        if (model_name == "ref") {
          const fname = row.insertCell();
          fname.textContent = contents[i].name.replace(".wav", "");
        }
        const cell = row.insertCell();
        const audioElement = document.createElement("audio");
        console.log(model_name, root_path + selectedSpk + "/" + model_name + "/" + contents[i].name)
        audioElement.src = root_path + selectedSpk + "/" + model_name + "/" + contents[i].name;
        audioElement.controls = true;
        cell.appendChild(audioElement);
      }
    }
  });
});
