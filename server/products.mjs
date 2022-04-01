import fs from "fs";

let products = [];

/**
 * CHARGE LES PRODUITS DU FICHIER DANS LE TABLEAU
 */
const loadProducts = () => {
  try {
    const data = fs.readFileSync("./products.json", "utf8");
    products = JSON.parse(data);
  } catch (err) {
    console.error(`loadProducts > ${err}`);
  }
};

/**
 * ECRIT LE TABLEAU DE PRODUITS DANS LE FICHIER
 */
const writeProducts = () => {
  try {
    fs.writeFileSync("./products.json", JSON.stringify(products, null, 2));
  } catch (err) {
    console.error(`writeProducts > ${err}`);
  }
};

/**
 * AJOUT SYNCHRONE
 * @param {string} p : product
 * @returns promise
 */
const add = (name, quantity) => {
  loadProducts();
  const pdt = products.find((e) => e.name === name);

  if (pdt) {
    if (quantity) {
      pdt.quantity += quantity;
    } else {
      console.log(`Manque la quantity pour ${name}`);
      return `Manque la quantity pour ${name}`;
    }
  } else {
    products.push({ name, quantity });
  }

  writeProducts();

  console.log(`${quantity} ${name} ajouté(e)(s)`);
  return `${quantity} ${name} ajouté(e)(s)`;
};

/**
 * RETOURNE LA LISTE DES PRODUITS
 * @returns [object]
 */
const getAll = () => {
  loadProducts();
  return products;
};

/**
 * RETOURNE UN PRODUIT PAR SON NOM
 * @param {*} id
 * @returns object : product
 */
const getByName = (name) => {
  loadProducts();
  return products.find((p) => p.name === name);
};

/**
 * MET A JOUR UN PRODUIT PAR SON NOM
 * @param {string} name
 * @param {object} p : product
 * @returns bool
 */
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

/**
 * SUPPRIME LE PRODUIT SI AUCUNE QUANTITY PASSEE SINON SUPPRIME LE NOMBRE DE QUANTITY
 * @param {*} name
 * @param {*} quantity
 * @returns
 */
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
      console.log(`${quantity} ${name} supprimé(e)(s), reste ${pdt.quantity}`);
      writeProducts();
      return true;
    }

    // supprime le produit
    products = products.filter((e) => e.name !== name);
    console.log(`${p.name} supprimé(e)s, 0 stock`);
    writeProducts();
    return true;
  }

  return false;
};

export { add, getAll, getByName, update, remove };
