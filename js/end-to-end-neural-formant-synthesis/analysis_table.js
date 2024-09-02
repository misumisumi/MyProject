const analysis_metric_models = {
  "ref": "Reference",
  "hifigan": "HiFi-GAN",
  "nf": "NF (baseline)",
  "e2e-nf": "E2E-NF",
  "e2e-nf-pl": "E2E-NF+",
  "e2e-sifi-nf": "E2E-SiFi-NF",
}

const analysisSelect = document.getElementById("analysis");
speaker_names.forEach((speaker) => {
  const optionElement = document.createElement("option");
  // replace jvs001_m to JVS001 (M)
  optionElement.textContent = speaker.replace(/(\w+)_(\w)/, (match, p1, p2) => `${p1.toUpperCase()} (${p2.toUpperCase()})`);
  optionElement.value = speaker;
  analysisSelect.appendChild(optionElement);
});

const analysisSynthesisHeader = document.getElementById("analysisSynthesisTable").getElementsByTagName("tr")[0];
const analysisHeaderCell = document.createElement("th");
analysisHeaderCell.textContent = "Sample";
analysisSynthesisHeader.appendChild(analysisHeaderCell);
for (const model in analysis_metric_models) {
  const analysisHeaderCell = document.createElement("th");
  analysisHeaderCell.textContent = analysis_metric_models[model];
  analysisSynthesisHeader.appendChild(analysisHeaderCell);
}

const analysisSynthesisTable = document.getElementById("analysisSynthesisTable").getElementsByTagName("tbody")[0];

function create_analysis_audio_sample() {
  const selectedSpk = analysisSelect.value;
  analysisSynthesisTable.innerHTML = "";

  // [ {name: "speaker", contents: [ {name: "model", contents: [ {name: "file", contents: "path"} ] } ] }, ... ]
  const products = [analysis_synthesis[0].contents.filter((speaker) => speaker.name === selectedSpk)[0].contents] || [];

  products.forEach((product) => {
    // 始めのcontentsの長さ=評価サンプル数
    // static/audio/<title>以下のモデルにファイルが等しく存在すると仮定
    for (let i = 0; i < product[0].contents.length; i++) {
      const row = analysisSynthesisTable.insertRow();
      for (const model_name in analysis_metric_models) {
        const contents = product.filter((model) => model.name === model_name)[0].contents;
        if (model_name == "ref") {
          const fname = row.insertCell();
          fname.textContent = sample_names[i];
        }
        const cell = row.insertCell();
        const audioElement = document.createElement("audio");
        // console.log(model_name, analysis_path + selectedSpk + "/" + model_name + "/" + contents[i].name)
        audioElement.src = analysis_path + selectedSpk + "/" + model_name + "/" + contents[i].name;
        audioElement.controls = true;
        cell.appendChild(audioElement);
      }
    }
  });
};

document.addEventListener("DOMContentLoaded", create_analysis_audio_sample);
analysisSelect.addEventListener("change", create_analysis_audio_sample);
