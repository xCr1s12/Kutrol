"use client";

import { useState } from "react";

const ACTIVE_TAB_COLOR = "#1A1A1A";

const page = () => {
    const [activeButton, setActiveButton] = useState("Todos");
    const buttons = [
        { text: "Todos" },
        { text: "Activos" },
        { text: "Mantencion" },
    ];


    const [conductores, setConductores] = useState([
        { conductor: "Juan Díaz", estado: "activo", vehiculo_cargo: "A1" },
        { conductor: "Ana Rojas", estado: "activo", vehiculo_cargo: "A2" },
        { conductor: "Luis Pérez", estado: "inactivo", vehiculo_cargo: "A3" },
        { conductor: "Marta Silva", estado: "activo", vehiculo_cargo: "A4" },
    ])
    const [vehiculos, setVehiculos] = useState([
        {patente: "A1", rendimiento: "100%", estado: "activo", encargado: "Jhon doe"},
        {patente: "A2", rendimiento: "50%", estado: "activo", encargado: "Jhon doe"},
        {patente: "A3", rendimiento: "250%", estado: "activo", encargado: "Jhon doe"},
        {patente: "A4", rendimiento: "0%", estado: "activo", encargado: "Jhon doe"},
    ])

    return (
        <main
            className="flex flex-col w-full bg-[#FDFBF7] overflow-hidden"
            lang="es"
        >
            {/* Seccion de Vehiculos */}
            <section className="flex  p-10 flex-col w-full bg-[#FDFBF7]">
                <h2 className="text-[#1A1A1A] text-2xl font-bold"> Vehiculos</h2>
                <ul className="flex flex-row gap-5">
                    {buttons.map((button) => {
                        const isActive = activeButton === button.text;

                        return (
                            <li key={button.text}>
                                <button
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() => setActiveButton(button.text)}
                                    className="px-5 rounded-t-xl pt-2"
                                    style={{
                                        backgroundColor: isActive ? ACTIVE_TAB_COLOR : "#D9D6CF",
                                        color: isActive ? "#FFFFFF" : "#1A1A1A",
                                    }}
                                >
                                    {button.text}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            {/* Tabla de vehiculos*/}
                <div className="w-5/6 overflow-x-auto">
                    <table className="w-full border-collapse text-left border-[#EAE5DA]">
                        <thead>
                            <tr className="bg-[#F4F5F4] border-b border-[#D9D6CF] text-[#1A1A1A]">
                                <th className="px-4 py-3">Patente</th>
                                <th className="px-4 py-3">Rendimiento</th>
                                <th className="px-4 py-3">Estado</th>
                                <th className="px-4 py-3">Encargado</th>
                                <th className="px-4 py-3">Historial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehiculos.map((vehiculo, index) => (
                                <tr
                                    key={`${vehiculo.patente}-${index}`}
                                    className="border-b border-[#D9D6CF] text-[#1A1A1A]"
                                >
                                    <td className="px-4 py-3">{vehiculo.patente}</td>
                                    <td className="px-4 py-3">{vehiculo.rendimiento}</td>
                                    <td className="px-4 py-3">{vehiculo.estado}</td>
                                    <td className="px-4 py-3">{vehiculo.encargado}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            type="button"
                                            className="rounded-md bg-[#1A1A1A] px-3 py-2 text-white"
                                        >
                                            Ver historial
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Seccion de Conductores */}
            <section className="flex flex-col w-full bg-[#FDFBF7] p-10">
                <h2 className="text-[#1A1A1A] text-2xl font-bold">Conductores</h2>
                <div className="w-5/6 overflow-x-auto">
                    <table className="w-full border-collapse text-left border-[#EAE5DA]">
                        <thead>
                            <tr className="bg-[#F4F5F4] border-b border-[#D9D6CF] text-[#1A1A1A]">
                                <th className="px-4 py-3">Conductor</th>
                                <th className="px-4 py-3">Estado</th>
                                <th className="px-4 py-3">Vehículo a cargo</th>
                                <th className="px-4 py-3">Historial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {conductores.map((conductor, index) => (
                                <tr
                                    key={`${conductor.conductor}-${index}`}
                                    className="border-b border-[#D9D6CF] text-[#1A1A1A]"
                                >
                                    <td className="px-4 py-3">{conductor.conductor}</td>
                                    <td className="px-4 py-3">{conductor.estado}</td>
                                    <td className="px-4 py-3">{conductor.vehiculo_cargo}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            type="button"
                                            className="rounded-md bg-[#1A1A1A] px-3 py-2 text-white"
                                        >
                                            Ver historial
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default page;