import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';

import Spotify from '../util/Spotify';



// Fontawesome imports for global use
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab }  from '@fortawesome/free-brands-svg-icons';
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faPlay, faPause);



class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
    searchResults: [],
    playlistName: 'My Playlist',
    playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } 
    tracks.push(track);
    this.setState({playlistTracks: tracks})
  }

  // track the Ids property and filter it out of playlist tracks
  // filtered out if false statement
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks});
    }
  
  updatePlayListName(name) {
    this.setState({playlistName: name})
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render() {
    return(
      <div>
        <h1>Mu<span className="highlight">sic</span>ly</h1>
         <div className="App">
         <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
        <SearchResults 
        searchResults={this.state.searchResults}
        onAdd={this.addTrack} 
        />
        <Playlist playlistName={this.state.playlistName} 
        playlistTracks={this.state.playlistTracks}
        onRemove={this.removeTrack}
        onNameChange={this.updatePlayListName}
        onSave={this.savePlaylist}
        />
     </div>
    </div>
  </div>
    )
  }
}


export default App;
