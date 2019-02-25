import React, { Component } from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";

export default class Utente extends 
Component {
    render (){
        return(
        <Query query={gql`
            {
                User(id: 3){
                    id
                    fistName
                    lastName
                    
                }
            }
        `}>
            {({loading, error, data}) => (
                <div>
                    {loading &&
                    <p>caricamento...</p>}
                    {!loading && 
                    <div>
                        {JSON.stringify(data, null, 2)}
                    </div>}
                </div>
            )}
        </Query>)
    }
}
