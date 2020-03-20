var TimeUnit = Java.type("java.util.concurrent.TimeUnit");
var System = Java.type("java.lang.System");
var Random = Java.type("java.util.Random");

var duration = 5;
TimeUnit.SECONDS.sleep(duration);
System.out.println("Processing 1 done.");

TimeUnit.SECONDS.sleep(duration);
System.out.println("Processing 2 done.");

TimeUnit.SECONDS.sleep(duration);
var random = new Random();
var randomInteger = random.nextInt();
randomInteger = randomInteger%2;
if (randomInteger == 0) {
	System.out.println("Completed Successfully.");
} else {
	System.out.println("Failed.");
}
