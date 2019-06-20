import { environment } from '../../environments/environment';
export class CONFIG {
    // static LINK_IMAGE =  environment.production ? 'http://demo.msblandingpage.com/images/' : 'http://demo.msblandingpage.com/images/';
    // static LINK_FILE =  environment.production ? 'http://demo.msblandingpage.com/images/' : 'http://demo.msblandingpage.com/images/';
    static LINK_IMAGE =  environment.LINK_IMAGE;
    static LINK_FILE =  environment.LINK_FILE;

    // link gmap
    // @see https://developers.google.com/maps/documentation/urls/guide
    static GMAP = {
        /**
         * Parameters
         *  query (required): Defines the place(s) to highlight on the map. The query parameter is required for all search requests.
         *  query_place_id (optional): A place ID is a textual identifier that uniquely identifies a place.
         */
        SEARCH : "https://www.google.com/maps/search/?api=1&parameters",

        /**
         * Parameters
         *  origin: Defines the starting point from which to display directions. 
         *  origin_place_id (optional): A place ID is a textual identifier that uniquely identifies a place.
         *  destination: Defines the endpoint of the directions. If none, the resulting map may provide a blank form to allow the user to enter the destination. 
         *  destination_place_id (optional): A place ID is a textual identifier that uniquely identifies a place.
         *  travelmode (optional): Defines the method of travel. Options are driving, walking (which prefers pedestrian paths and sidewalks, where available),
         *                          bicycling (which routes via bike paths and preferred streets where available), or transit
         *  dir_action=navigate (optional): Launches either turn-by-turn navigation or route preview to the specified destination, based on whether the origin is available. 
         *  waypoints: Specifies one or more intermediary places to route directions through between the origin and destination.
         *  waypoint_place_ids (optional): A place ID is a textual identifier that uniquely identifies a place.  
         */
        DIRECTIONS : "https://www.google.com/maps/preview?parameters",
        DISPLAY : {
            /**
             *  center (optional): Defines the center of the map window, and accepts latitude/longitude coordinates as comma-separated values (for example, -33.8569,151.2152).
             *  zoom (optional): Sets the initial zoom level of the map. Accepted values are whole integers ranging from 0 (the whole world) to 21 (individual buildings).
             *  basemap (optional): Defines the type of map to display. The value can be either roadmap (default), satellite, or terrain.
             *  layer (optional): Defines an extra layer to display on the map, if any. The value can be one of the following: none (default), transit, traffic, or bicycling.
             */
            MAP : "https://www.google.com/maps/@?api=1&map_action=map&parameters",
            /**
             *  viewpoint: The viewer displays the panorama photographed closest to the viewpoint location, specified as comma-separated latitude/longitude coordinates (for example 46.414382,10.013988). 
             *  pano: The specific panorama ID of the image to display. If you specify a pano you may also specify a viewpoint.
             *  heading: Indicates the compass heading of the camera in degrees clockwise from North. Accepted values are from -180 to 360 degrees.
             *  pitch: Specifies the angle, up or down, of the camera. The pitch is specified in degrees from -90 to 90.
             *  fov: Determines the horizontal field of view of the image. The field of view is expressed in degrees, with a range of 10 - 100.
             */
            PANO : "https://www.google.com/maps/@?api=1&map_action=pano&parameters",
        }
    }

    /**
     * mã màu cho bản đồ
     */
    static COLOR_CODE = {
        // xam
        GREY:"#6b7784",
        //đỏ
        RED:"#e95d4f"
    }

    static TIMEOUT_REFRESH = 250;
}