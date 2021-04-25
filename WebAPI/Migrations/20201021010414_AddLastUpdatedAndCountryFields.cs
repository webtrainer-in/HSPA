using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class AddLastUpdatedAndCountryFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Cities",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdatedOn",
                table: "Cities",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "LastUpdatedBy",
                table: "Cities",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
        {
            migrationBuilder.DropColumn(
                name: "Country",
                table: "Cities");
        }
            migrationBuilder.DropColumn(
                name: "LastUpdatedBy",
                table: "Cities");

            migrationBuilder.DropColumn(
                name: "LastUpdatedOn",
                table: "Cities");
        }
    }
}
