package smartlogis

class Pengungsi {
	EventBencana event
	Integer jumlahTotal
	String jumlahKK
	String usia1
	String usia2
	String usia3
	String usia4
	String usia5
	String usia6
	String lakiLaki
	String perempuan
	String hamil
	String difabel
    static constraints = {
    	event(nullable: true)
		jumlahTotal(nullable: true)
		jumlahKK(nullable: true)
		usia1(nullable: true)
		usia2(nullable: true)
		usia3(nullable: true)
		usia4(nullable: true)
		usia5(nullable: true)
		usia6(nullable: true)
		lakiLaki(nullable: true)
		perempuan(nullable: true)
		hamil(nullable: true)
		difabel(nullable: true)
    }
}
