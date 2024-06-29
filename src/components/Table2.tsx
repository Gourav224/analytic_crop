import React from "react";
import { Table, ScrollArea } from "@mantine/core";
import data from "../data/Manufac _ India Agro Dataset.json";

interface CropData {
    Country: string;
    Year: string;
    CropName: string;
    CropProduction: string | number;
    YieldOfCrops: string | number;
    AreaUnderCultivation: string | number;
}

// Function to calculate crop analytics
function calculateCropAnalytics(data: CropData[]) {
    const aggregatedData: {
        crop: string;
        averageYield: number;
        averageCultivationArea: number;
    }[] = [];

    // Step 1: Group data by crop
    const groupedByCrop: Record<string, CropData[]> = {};
    data.forEach((item) => {
        const cropName = item.CropName;

        if (!groupedByCrop[cropName]) {
            groupedByCrop[cropName] = [];
        }
        groupedByCrop[cropName].push(item);
    });
    // Step 2: Calculate average yield and cultivation area for each crop
    for (const cropName in groupedByCrop) {
        if (Object.prototype.hasOwnProperty.call(groupedByCrop, cropName)) {
            const crops = groupedByCrop[cropName];
            const averageYield = calculateAverageYield(crops);
            const averageCultivationArea =
                calculateAverageCultivationArea(crops);
            aggregatedData.push({
                crop: cropName,
                averageYield: averageYield,
                averageCultivationArea: averageCultivationArea,
            });
        }
    }
    return aggregatedData;
}

// Helper function: Calculate average yield for a crop
function calculateAverageYield(crops: CropData[]): number {
    const validYields = crops
        .filter(
            (crop) => crop.YieldOfCrops !== "" && !isNaN(+crop.YieldOfCrops)
        )
        .map((crop) => +crop.YieldOfCrops);
    const sum = validYields.reduce((acc, yieldValue) => acc + yieldValue, 0);
    return sum / validYields.length;
}

// Helper function: Calculate average cultivation area for a crop
function calculateAverageCultivationArea(crops: CropData[]): number {

    const validAreas = crops
        .filter((crop) => {
            return (
                crop.AreaUnderCultivation !== "" &&
                !isNaN(crop.AreaUnderCultivation)
            );
        })
        .map((crop) => {
            return parseFloat(crop.AreaUnderCultivation);
        });

    const sum = validAreas.reduce((acc, area) => acc + area, 0);

    return sum / validAreas.length;
}

const Table2: React.FC = () => {
    const cropAnalytics = calculateCropAnalytics(data);
    const rows = cropAnalytics.map((item, index) => (
        <Table.Tr key={index}>
            <Table.Td>{item.crop}</Table.Td>
            <Table.Td>{item.averageYield.toFixed(3)}</Table.Td>
            <Table.Td>{item.averageCultivationArea.toFixed(3)}</Table.Td>
        </Table.Tr>
    ));

    return (
        <ScrollArea style={{ maxHeight: 400 }}>
            <Table striped>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Crop</Table.Th>
                        <Table.Th>Average Yield</Table.Th>
                        <Table.Th>Average Cultivation Area</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
};

export default Table2;
