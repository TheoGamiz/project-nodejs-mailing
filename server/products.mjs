import fs from "fs";

let products = [];



//Lis le fichier products.json

const loadProducts = () => {
  try {
    const data = fs.readFileSync("./products.json", "utf8");
    products = JSON.parse(data);
  } catch (err) {
    console.error(` ${err}`);
  }
};

//insert le produit dans le fichier products.json

const writeProducts = () => {
  try {
    fs.writeFileSync("./products.json", JSON.stringify(products, null, 2));
  } catch (err) {
    console.error(` ${err}`);
  }
};

//ajout du produit

const add = (name, quantity) => {
  loadProducts();
  const pdt = products.find((e) => e.name === name);

  if (pdt) {
    if (quantity) {
      pdt.quantity += quantity;
    } else {
      console.log(`entrez une quantité ${name}`);
      return `entrez une quantité ${name}`;
    }
  } else {
    products.push({ name, quantity });
  }

  writeProducts();

  console.log(`${quantity} ${name} added`);
  return `${quantity} ${name} added`;
};

//Retourne la liste des produits
const getAll = () => {
  loadProducts();
  return products;
};

//Retourne les infos d'un produit par rapport à son nom
const getByName = (name) => {
  loadProducts();
  return products.find((p) => p.name === name);
};

//Met à jour un produit par rapport à son nom
const update = (name, p) => {
  loadProducts();
  const i = products.findIndex((e) => e.name === name);

  if (i > -1) {
    products[i] = p;
    writeProducts();
    return true;
  }

  return false;
};

//supprime la quantité de produit
const remove = (name, quantity) => {
  const pdt = products.find((e) => e.name === name);

  if (pdt) {
    if (quantity) {
      // pas assez de stock
      if (quantity > pdt.quantity) {
        console.log(`Stock insufisant pour ${name} : ${pdt.quantity} max`);
        return false;
      }

      // soustrait le stock
      pdt.quantity -= quantity;
      console.log(`${quantity} ${name} supprimé, il reste ${pdt.quantity}`);
      writeProducts();
      return true;
    }

    // supprime le produit
    products = products.filter((e) => e.name !== name);
    console.log(`${p.name} deleted`);
    writeProducts();
    return true;
  }

  return false;
};

export { add, getAll, getByName, update, remove };
