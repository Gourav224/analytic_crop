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
    // Step 1: Aggregate data to find max and min crops for each year
    const maxMinCrops: { year: string; maxCrop: string; minCrop: string }[] =
        [];

    const groupedByYear: Record<string, CropData[]> = {};
    data.forEach((item) => {
        const year = item.Year;
        if (!groupedByYear[year]) {
            groupedByYear[year] = [];
        }
        groupedByYear[year].push(item);
    });

    for (const year in groupedByYear) {
        if (Object.prototype.hasOwnProperty.call(groupedByYear, year)) {
            const crops = groupedByYear[year];
            let maxProduction = -Infinity;
            let minProduction = Infinity;
            let maxCrop = "";
            let minCrop = "";

            crops.forEach((crop) => {
                const production = +crop.CropProduction;
                if (!isNaN(production)) {
                    if (production > maxProduction) {
                        maxProduction = production;
                        maxCrop = crop.CropName;
                    }
                    if (production < minProduction) {
                        minProduction = production;
                        minCrop = crop.CropName;
                    }
                }
            });

            maxMinCrops.push({ year, maxCrop, minCrop });
        }
    }

    // Step 2: Calculate average yield and cultivation area (not implemented in this component)

    return maxMinCrops;
}

const Table1: React.FC = () => {
    // console.log(data)
    const cropAnalytics = calculateCropAnalytics(data);
    console.log(cropAnalytics)

    const rows = cropAnalytics.map((item) => (
        <Table.Tr key={item.year}>
            <Table.Td>{item.year}</Table.Td>
            <Table.Td>{item.maxCrop}</Table.Td>
            <Table.Td>{item.minCrop}</Table.Td>
        </Table.Tr>
    ));

    return (
        <ScrollArea >
            <Table striped>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Year</Table.Th>
                        <Table.Th>Crop with Maximum Production</Table.Th>
                        <Table.Th>Crop with Minimum Production</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
};

export default Table1;
