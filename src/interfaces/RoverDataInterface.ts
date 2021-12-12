import { ImageProps } from "react-native";
import RoverCameraDataInterface from "./RoverCameraDataInterface";

export default interface RoverDataInterface {
    id: number,
    name: string,
    image: ImageProps,
    landing_date: string,
    launch_date: string,
    max_date: string,
    status: string,
    total_photos: number,
    cameras: Array<RoverCameraDataInterface>
}