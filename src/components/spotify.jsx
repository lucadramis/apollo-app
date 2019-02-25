import React, { Component } from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import { Collapse, Button, Table, } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import Artist from './artist';

library.add(faPlay)

const humanizeDuration = require('humanize-duration')
humanizeDuration(12000) // '12 seconds'

const shortEnglishHumanizer = humanizeDuration.humanizer({
    language: 'shortEn',
    languages: {
      shortEn: {
        m: () => '',
        s: () => '',
      }
    },
    round: true,
    conjunction:':'
  })
  
  shortEnglishHumanizer(15600000)

export default class Utente extends 
Component {
    constructor(props) {
        super(props);
        this.toggletrack = this.toggletrack.bind(this);
        this.toggleartist = this.toggleartist.bind(this);
        this.state = { collapsetrack: false, collapseartist: false };
      }
    
      toggletrack() {
        this.setState({ collapsetrack: !this.state.collapsetrack });
      }
      toggleartist() {
        this.setState({ collapseartist: !this.state.collapseartist });
      }
    render (){
        return(
        <Query query={gql`
        {
          me {
            images {
              height
              width
              url
            }
            id
            birthday
            display_name
            email


            top_tracks {
              name
              track_number
                duration_ms
              artists {
                name
              }
              name
              album {
                name
              }
            preview_url
            }



            top_artists {
              images {
                height
                width
                url
              }
              name
            }
          }
        }
        `}>
            {({loading, error, data}) =>{
              if(loading) {
                  return(
                  <p>caricamento...</p>)
                }else {
                  if (error) {
                   return ( <p>Errore 503 nessun dato da graphql?!</p>)
                  }else{
                    
                  return (

                  <div>
                
                    {!loading && 
                    <div>
                        {/*JSON.stringify(data, null, 2)*/}
                        <img className="imguser" src={data.me.images[0].url} width="100" height="100"></img>
                        <div>nome utente: {data.me.display_name}</div>
                        <div>link: {data.me.href}</div>
                        <div>email :{data.me.email}</div>
                  <div className="tracks">
                        <Button color="primary" onClick={this.toggletrack} style={{ marginBottom: '1rem' }}>Top Tracks</Button>
                    <Collapse isOpen={this.state.collapsetrack}>
                    <div className="top_tracks">

                            <Table dark>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Duration</th>
                                  <th>Name</th>
                                  <th>Artist</th>
                                  <th>Album</th>
                                  <th>Play</th>
                                </tr>
                              </thead>
                              <tbody>

                                {data.me.top_tracks.map((item, idx) =>
                                  <tr>
                                    <td scope="row"><div>{idx + 1}</div></td>

                                    <td> <div>{shortEnglishHumanizer(item.duration_ms)}</div></td>
                                    <td><div>{item.name}</div></td>
                                    <td><div>{item.artists[0].name}</div></td>
                                    <td><div>{item.album.name}</div></td>
                                    <td><div><a href={item.preview_url}><FontAwesomeIcon icon="play" /></a></div></td>
                                  </tr>
                                )}
                              </tbody>
                            </Table>
                          </div>
                    </Collapse>
                    </div>
                    <div className="artist">
                    <Button color="primary" onClick={this.toggleartist} style={{ marginBottom: '1rem' }}>Top Artist</Button>
                    <Collapse isOpen={this.state.collapseartist}>
                    <div className="top_Artists">

                            <Table dark>
                              <thead>
                                <tr>
                                  <th>Artist</th>
                                  <th>Image Profile</th>
                                  
                                </tr>
                              </thead>
                              <tbody>

                                {data.me.top_artists.map((item, idx) =>
                                  <tr>
                                    <td><div>{item.name}</div></td>
                                    <td><div><img src={item.images[2].url}style={{width:'100',height:'100'}}/></div></td>


                                    
                                  </tr>
                                )}
                              </tbody>
                            </Table>
                          </div>
                    </Collapse>
                    
                        <Artist></Artist>
                        {/*<div>top tracs : {data.me.top_tracks[0].album.name}</div>*/}
                        
                        {/*<div> {data.me.top_artists.map((item)=>
                            <div>{item.name}</div>)}
                        </div>*/}
                        {/*<div>top artist : {data.me.top_artists[0].name}</div>*/}
                        
                        
                        
                        
                    </div>
                </div>
                }
                </div>
            )}
              }}}
        </Query>)
    }
}
