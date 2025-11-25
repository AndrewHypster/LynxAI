export default async function  Page({ params }) {
  const {name} = await params
  
  
  return <h1 style={{width:'fit-content',margin:'0 auto',fontSize:'4rem'}}>Категорія / продукт: {name}</h1>;
}
