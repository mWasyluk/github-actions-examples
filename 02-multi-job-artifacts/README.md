# 🧪 MODULE 02: Multi Job Artifacts

## 📝 NOTES
- runner `ubuntu-latest` zawiera 4 wersje JVM i wszystkie mają w systemie ustawione zmienne środowiskowe wskazujące lokalizację JDK: `JAVA_HOME_[8|11|17|21]_X64` ( wersja `11` jest domyślną i przypisaną również do zmiennej `JAVA_HOME`). Wszystkie wersje są dostępne w katalogu `/usr/lib/jvm/`.
- Maven is not intalled by default so it is convinient to provide Maven Wrapper to the project before pushing it to a repository. It can be easily done with the `mvn -N wrapper:wrapper` command.
- `jobs.<>.steps.<>.with` nie pozwala na użycie environment variables
- actions/checkout@v4 pozwala na pobranie plików z tylko jednego katalogu poprzez określenie ścieżki tego katalogu in the `...steps.<>.with.sparse-checkout` property

