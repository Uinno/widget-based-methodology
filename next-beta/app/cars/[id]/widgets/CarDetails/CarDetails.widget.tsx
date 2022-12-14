import {CarDetails} from "./CarDetails.types";
import {EditCarButtonWidget} from "../../../../../widgets/EditCarButton/EditCarButtonWidget";
import Link from "next/link";
import {DeleteCarButton} from "../DeleteCarButton/DeleteCarButton";

async function getData(id: string): Promise<CarDetails> {
    const res = await fetch(`http://localhost:3001/cars/${id}`, {next: {revalidate: 1}})

    return res.json();
}

export default async function CarDetailsWidget({id}: { id: string }) {
    const carDetails = await getData(id);

    return (
        <div className="card w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Car details</h2>
                <table className="table w-full">
                    <tbody>
                    <tr>
                        <td><b>Brand</b></td>
                        <td>{carDetails.brand}</td>
                    </tr>
                    <tr>
                        <td><b>Model</b></td>
                        <td>{carDetails.model}</td>
                    </tr>
                    <tr>
                        <td><b>Year</b></td>
                        <td>{carDetails.year}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="card-actions justify-end">
                    <Link href="/" className="btn mr-2">Back</Link>
                    <DeleteCarButton className="mr-2" id={id}/>
                    <EditCarButtonWidget id={id}/>
                </div>
            </div>
        </div>

    )
}
