const categorySelect = document.getElementById("category");
const productTable = document
  .getElementById("productTable")
  .getElementsByTagName("tbody")[0];

const productData = {
  jvs001: [
    { name: "hoge", price: "test" },
    { name: "hoge", price: "audio/VOICEACTRESS100_091.wav" },
    { name: "hoge", price: "audio/VOICEACTRESS100_091.wav" },
  ],
  jvs002: [
    { name: "hoge", price: "audio/VOICEACTRESS100_091.wav" },
    { name: "hoge", price: "audio/VOICEACTRESS100_091.wav" },
    { name: "hoge", price: "audio/VOICEACTRESS100_091.wav" },
  ],
  jvs003: [
    { name: "hoge", price: "audio/VOICEACTRESS100_091.wav" },
    { name: "hoge", price: "audio/VOICEACTRESS100_091.wav" },
    { name: "hoge", price: "audio/VOICEACTRESS100_091.wav" },
  ],
  jvs004: [
    { name: "hoge", price: "audio/VOICEACTRESS100_091.wav" },
    { name: "hoge", price: "audio/VOICEACTRESS100_091.wav" },
    { name: "hoge", price: "audio/VOICEACTRESS100_091.wav" },
  ],
};

categorySelect.addEventListener("change", () => {
  const selectedCategory = categorySelect.value;
  const products = productData[selectedCategory] || []; // 選択肢がない場合は空の配列

  // テーブルの内容をクリア
  productTable.innerHTML = "";

  // 選択されたカテゴリの商品データを表示
  products.forEach((product) => {
    const row = productTable.insertRow();
    const nameCell = row.insertCell();
    const priceCell = row.insertCell();
    // const audioElement = document.createElement("audio");
    // audioElement.src = product.price;
    // audioElement.controls = true;

    nameCell.textContent = product.name;
    priceCell.textContent = product.price;
    // priceCell.appendChild(audioElement);
  });
});
