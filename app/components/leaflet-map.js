
/* global L */
import Ember from 'ember';
import EmberLeafletComponent from 'ember-leaflet/components/leaflet-map';
import MarkerLayer from 'ember-leaflet/layers/marker';
import MarkerCollectionLayer from 'ember-leaflet/layers/marker-collection';

import DraggableMixin from 'ember-leaflet/mixins/draggable';
import PopupMixin from 'ember-leaflet/mixins/popup';

import TileLayer from 'ember-leaflet/layers/tile';

export default EmberLeafletComponent.extend({
  center: L.latLng(78, -90),
  zoom: 4, 

  childLayers: [
    TileLayer.extend({
      tileUrl: 'http://heta3.saerdnaer.de/ma/misc/fmi/{z}/{y}_{x}.png',
      //tileUrl: '/assets/fmi/{z}/{y}_{x}.png',
      options: {
        minZoom: 3, maxZoom: 7
      }
    }),
    MarkerCollectionLayer.extend({
        content: function() {
          return this.controller.get('model');
        }.property('location'),
        itemLayerClass: MarkerLayer.extend(DraggableMixin, PopupMixin, { 
          popupViewClass: Ember.Component.extend({
            layoutName: 'lamp-popup',
            classNames: ['popup-view'],
            tagName: 'span'
          })
        })
    })
    
  ]
});
