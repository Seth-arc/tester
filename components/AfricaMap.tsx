'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Icon } from 'leaflet'

interface Institution {
  name: string;
  type: string;
}

interface User {
  name: string;
  surname: string;
  latitude: number;
  longitude: number;
  institution: Institution;
}

interface AfricaMapProps {
  users: User[];
}

const icon: Icon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

export default function AfricaMap({ users }: AfricaMapProps) {
  if (typeof window === 'undefined') {
    return null // Return null during server-side rendering
  }

  return (
    <MapContainer
      center={[0, 20]}
      zoom={3}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {users.map((user, index) => (
        <Marker
          key={index}
          position={[user.latitude, user.longitude]}
          icon={icon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-lg">{user.name} {user.surname}</h3>
              <p className="text-sm">{user.institution.name}</p>
              <p className="text-sm text-gray-600">{user.institution.type}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}