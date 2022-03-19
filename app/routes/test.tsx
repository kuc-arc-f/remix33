//import { useEffect, useRef } from "react";
import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, Link } from "remix";
import { Form, json, useActionData, redirect } from "remix";
import { gql } from "@apollo/client";
import client from '../../apollo-client'

export let meta: MetaFunction = () => {
  return {
    title: "test | Remix Starter",
    description: "Welcome to remix!"
  };
};
export let loader: LoaderFunction = async () => {
  const data = await client.query({
    query: gql`
    query {
      tasks {
        id
        title
        created_at
      }
    }
    `,
    fetchPolicy: "network-only"
  });
console.log(data.data.tasks); 
  return json(data.data.tasks);
}


export default function Page() {
  //let data = useActionData();
  let data: any[] = useLoaderData<any>();
  console.log(data);

  let onClick = async function(){
    try{
      console.log("#onClick");
      const title = document.querySelector<HTMLInputElement>('#title');
      console.log(title.value);
      const result = await client.mutate({
        mutation:gql`
        mutation {
          addTask(title: "${title.value}"){
            id
          }
        }            
      `
      });
  console.log(result);      
    } catch (e) {
      console.error(e);
      alert('Error , add task');
    }    
  }
  
  return (
    <div className="remix__page">
      <main>
        <h2>Test</h2>
        <hr />
        <p>welcome, about</p>
        <hr />
        add:<br />
        <label>
          <div>Title:</div>
          <input type="text" name="title" id="title" />
        </label>        
        <button onClick={() => onClick()}>Add</button>
        <hr />
        <ul>
        {data.map(item => (
          <li key={item.id} className="remix__page__resource">
            {item.title}
            <Link to={item.id}>[ Show ]</Link>
            <Link to={`edit/${item.id}`}>[ edit ]</Link>
          </li>
        ))}
        </ul>        
      </main>
    </div>
  );
}
