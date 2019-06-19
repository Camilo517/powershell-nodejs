param (
    [Parameter(Mandatory = $false)]
    [string] $ComputerName = 'localhost'
)

 $drives = [System.IO.DriveInfo]::GetDrives() |
    Where-Object {$_.TotalSize} |
    Select-Object   @{Name='Ordenador'; Expr={$ComputerName}},
					@{Name='Nombre';     Expr={$_.Name}},
                    @{Name='Etiqueta';    Expr={$_.VolumeLabel}},
                    @{Name='Espacio(GB)'; Expr={[int32]($_.TotalSize / 1GB)}},
                    @{Name='Disponible(GB)'; Expr={[int32]($_.AvailableFreeSpace / 1GB)}},
                    @{Name='Espacio libre(%)';  Expr={[math]::Round($_.AvailableFreeSpace / $_.TotalSize,2)*100}},
                    @{Name='Formato';   Expr={$_.DriveFormat}},
                    @{Name='Tipo';     Expr={[string]$_.DriveType}}

$drives | ConvertTo-Json -Compress