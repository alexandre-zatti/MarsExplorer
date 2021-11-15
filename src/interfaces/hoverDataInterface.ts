import HoverCameraDataInterface from "./hoverCameraDataInterface";

export default interface HoverDataInterface {
    id: number,
    name: string,
    image: string,
    landing_date: string,
    launch_date: string,
    max_date: string,
    status: string,
    total_photos: number,
    cameras: Array<HoverCameraDataInterface>
}