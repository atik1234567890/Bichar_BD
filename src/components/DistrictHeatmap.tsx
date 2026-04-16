"use client";

import React, { useEffect, useState } from "react";
import { 
  ComposableMap, 
  Geographies, 
  Geography,
  ZoomableGroup 
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { useLanguage } from "@/context/LanguageContext";

// Simplified Bangladesh District GeoJSON URL
const GEO_URL = "https://raw.githubusercontent.com/mahmud-p-r/bangladesh-geojson/master/bd-districts.json";

interface DistrictData {
  district: string;
  total: number;
}

export default function DistrictHeatmap() {
  const { t, formatNumber, language } = useLanguage();
  const [data, setData] = useState<DistrictData[]>([]);
  const [tooltip, setTooltip] = useState("");

  useEffect(() => {
    async function fetchData() {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      try {
        const response = await fetch(`${API_URL}/api/stats/districts`);
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching district stats:", error);
      }
    }
    fetchData();
  }, []);

  const colorScale = scaleQuantile<string>()
    .domain(data.map(d => d.total))
    .range([
      "#2c1a1a",
      "#4a1a1a",
      "#6b1a1a",
      "#8b1a1a",
      "#ab1a1a",
      "#cb1a1a",
      "#eb1a1a"
    ]);

  return (
    <div className="heatmap-container bg-surface border border-border p-6 rounded-sm relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-mono uppercase tracking-widest text-white">{t("crimeHeatmap")}</h3>
        <div className="flex items-center gap-2">
          <span className="text-[0.6rem] font-mono text-text-faint">{t("low")}</span>
          <div className="flex h-2 w-24 bg-gradient-to-r from-[#2c1a1a] to-[#eb1a1a]" />
          <span className="text-[0.6rem] font-mono text-text-faint">{t("high")}</span>
        </div>
      </div>

      <div className="h-[400px] w-full relative">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 4500,
            center: [90.3563, 23.6850]
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup zoom={1} maxZoom={5}>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const d = data.find(s => s.district.toLowerCase() === geo.properties.name.toLowerCase());
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltip(`${geo.properties.name}: ${formatNumber(d ? d.total : 0)} ${t("cases")}`);
                      }}
                      onMouseLeave={() => {
                        setTooltip("");
                      }}
                      style={{
                        default: {
                          fill: d ? colorScale(d.total) : "#1a1a1a",
                          outline: "none",
                          stroke: "#333",
                          strokeWidth: 0.5
                        },
                        hover: {
                          fill: "#8b1a1a",
                          outline: "none",
                          stroke: "#fff",
                          strokeWidth: 1,
                          cursor: "pointer"
                        },
                        pressed: {
                          fill: "#8b1a1a",
                          outline: "none"
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {tooltip && (
          <div className="absolute top-0 right-0 bg-blood text-white text-[0.7rem] font-mono px-3 py-1.5 shadow-xl border border-white/20 z-20 pointer-events-none">
            {tooltip}
          </div>
        )}
      </div>
    </div>
  );
}
