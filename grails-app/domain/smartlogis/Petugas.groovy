package smartlogis

class Petugas {
	String userName
	String password
	Date tanggal
	EventBencana lokasi
	String role

    static constraints = {
    	userName(nullabel: true)
		password(nullabel: true)
		tanggal(nullabel: true)
		lokasi(nullabel: true)
		role(nullabel: true)
    }
}
