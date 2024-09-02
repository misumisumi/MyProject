const manipulated_metric_models = {
  "ref": "Reference",
  "nf": "NF (baseline)",
  "e2e-nf": "E2E-NF",
  "e2e-nf-pl": "E2E-NF+",
  "e2e-sifi-nf": "E2E-SiFi-NF",
}

const spkSelect = document.getElementById("manipulated-spk");
speaker_names.forEach((speaker) => {
  const optionElement = document.createElement("option");
  // replace jvs001_m to JVS001 (M)
  optionElement.textContent = speaker.replace(/(\w+)_(\w)/, (match, p1, p2) => `${p1.toUpperCase()} (${p2.toUpperCase()})`);
  optionElement.value = speaker;
  spkSelect.appendChild(optionElement);
});

const paramSelect = document.getElementById("manipulated-param");
manipulated_parameters.forEach((param) => {
  const optionElement = document.createElement("option");
  optionElement.textContent = param.toUpperCase();
  optionElement.value = param;
  paramSelect.appendChild(optionElement);
});

const scales = Array("0.7", "0.8", "0.9", "1.1", "1.2", "1.3");

const manipulatedSynthesisHeader = document.getElementById("manipulatedSynthesisTable").getElementsByTagName("tr")[0];
const manipulatedHeaderCell = document.createElement("th");
manipulatedHeaderCell.textContent = "Model";
manipulatedSynthesisHeader.appendChild(manipulatedHeaderCell);

scales.forEach((scale) => {
  const manipulatedHeaderCell = document.createElement("th");
  manipulatedHeaderCell.textContent = "×" + scale;
  manipulatedSynthesisHeader.appendChild(manipulatedHeaderCell);
});

const manipulatedSynthesisTable = document.getElementById("manipulatedSynthesisTable").getElementsByTagName("tbody")[0];

function create_manipulated_audio_sample() {
  const selectedSpk = spkSelect.value;
  const selectedParam = paramSelect.value;
  manipulatedSynthesisTable.innerHTML = "";

  // [ {name: "speaker", contents: [ {name: "model", contents: [ {name: "file", contents: "path"} ] } ] }, ... ]
  const products = manipulated_synthesis[0].contents.filter((speaker) => speaker.name === selectedSpk)[0].contents || [];

  const samples = new Object();
  products.forEach((product) => {
    samples[product.name] = product.contents.filter((param) => param.name === selectedParam)[0].contents;
  });

  for (const model_name in manipulated_metric_models) {
    const row = manipulatedSynthesisTable.insertRow();
    if (model_name == "ref") {
      continue;
    }
    const cell = row.insertCell();
    cell.textContent = manipulated_metric_models[model_name];
    samples[model_name].forEach((sample) => {
      const cell = row.insertCell();
      const audioElement = document.createElement("audio");
      audioElement.src = manipulated_path + selectedSpk + "/" + model_name + "/" + selectedParam + "/" + sample.name;
      audioElement.controls = true;
      cell.appendChild(audioElement);
    });
  };
};

document.addEventListener("DOMContentLoaded", create_manipulated_audio_sample);
spkSelect.addEventListener("change", create_manipulated_audio_sample);
paramSelect.addEventListener("change", create_manipulated_audio_sample);
