package smartlogis

class EventBencana {
	String lokasi
	String propinsi
	String kabupaten
	Date tanggal
	String jenisBencana
    static constraints = {
    	lokasi(nullabel :true)
		tanggal(nullabel :true)
		jenisBencana(nullabel :true)
		propinsi(nullabel: true)
		kabupaten(nullabel: true)
    }
}
