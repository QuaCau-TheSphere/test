const testString =`\`\`\`quote
quote: Misquotations are the only quotations that are never misquoted.
author:
  name: Hesketh Pearson
  title: British actor, theater director and writer
  org: Company name
  image: https://upload.wikimedia.org/wikipedia/en/d/d0/Hesketh_Pearson.jpg
\`\`\``

function htmlTemplateFn({quote, name, title, org, image}){
  const quoteSentences = quote.split('. ')
  const quoteWithFragmentTags = "<span class='fragment'>" + quoteSentences.join(".</span> <span class='fragment'>") + "</span>" 
  return `<figure class="quote">
    <div class="col1">
      <div>❝ ${quoteWithFragmentTags}</div>
    </div>
    <div class="author fragment">
      <img src="${image}">
      <div class='name' >${name}</div>
      <div class='title'>${title}</div>
      <div class='org' >${org}</div>
    </div>
  </figure>`
} 

function getValue(quoteBlock, field) {
  const pattern = `${field}:(.*)`;
  const regex = new RegExp(pattern, 'g') 
  return [...quoteBlock.matchAll(regex)][0][1].trim();
}

function quoteSlideFn(markdown) {
  const regex = /\`\`\`quote(.*?)\`\`\`/gs
  const quoteBlocks = [...markdown.matchAll(regex)] 
  let result = markdown

  for (const quoteBlock of quoteBlocks) {
    const data = {
      quote: getValue(quoteBlock[0], 'quote'),
      name: getValue(quoteBlock[0], 'name'),
      title: getValue(quoteBlock[0], 'title'),
      org: getValue(quoteBlock[0], 'org'),
      image: getValue(quoteBlock[0], 'image'),
    } 
    const html = htmlTemplateFn(data) 
    result = result.replace(quoteBlock[0], html)
  } 
  return result;
}

export default function (markdown, _options) {
  return new Promise((resolve, _reject) => {
    return resolve(quoteSlideFn(markdown));
  });
}

// console.log(quoteSlideFn(testString))